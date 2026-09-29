import { readFile, rm, writeFile } from 'node:fs/promises'

const projectRoot = new URL('../', import.meta.url)
const indexFile = new URL('dist/index.html', projectRoot)
const serverBundle = new URL('.prerender/entry-server.js', projectRoot)
const prerenderDirectory = new URL('.prerender/', projectRoot)
const rootMarker = '<div id="root"></div>'
const styleMarker = '<!-- APP_STYLES -->'

try {
  const [{ render }, indexHtml] = await Promise.all([
    import(serverBundle.href),
    readFile(indexFile, 'utf8'),
  ])

  if (!indexHtml.includes(rootMarker)) {
    throw new Error('Unable to find the app root in dist/index.html')
  }

  if (!indexHtml.includes(styleMarker)) {
    throw new Error('Unable to find the app style marker in dist/index.html')
  }

  const stylesheetMatch = indexHtml.match(
    /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/,
  )

  if (!stylesheetMatch) {
    throw new Error('Unable to find the app stylesheet in dist/index.html')
  }

  const clientScriptMatch = indexHtml.match(
    /<script type="module" crossorigin src="[^"]+\.js"><\/script>/,
  )

  if (!clientScriptMatch) {
    throw new Error('Unable to find the client script in dist/index.html')
  }

  const stylesheetFile = new URL(`dist/${stylesheetMatch[1].replace(/^\//, '')}`, projectRoot)
  const stylesheet = await readFile(stylesheetFile, 'utf8')
  const appHtml = render('/')
  const prerenderedRoot = `<div id="root" data-prerendered-path="/">${appHtml}</div>`
  const inlinedStyles = `<style data-inline-app-styles>${stylesheet}</style>`
  const lowPriorityClientScript = clientScriptMatch[0].replace(
    ' crossorigin ',
    ' crossorigin fetchpriority="low" ',
  )
  const outputHtml = indexHtml
    .replace(stylesheetMatch[0], '')
    .replace(clientScriptMatch[0], lowPriorityClientScript)
    .replace(styleMarker, inlinedStyles)
    .replace(rootMarker, prerenderedRoot)

  await writeFile(indexFile, outputHtml)
} finally {
  await rm(prerenderDirectory, { recursive: true, force: true })
}
