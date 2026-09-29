# Appalachian Asenso website

React and Vite site for [appalachianasenso.com](https://appalachianasenso.com/).

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Party form, Google reviews, and venue video

The page is ready for optional environment-specific settings in `.env.local`:

- `VITE_FORMSPREE_ENDPOINT`: optionally override the configured Formspree endpoint for another environment.
- `VITE_VENUE_VIDEO_URL`: optionally override the included `src/assets/laser.mp4` venue video with another public MP4 URL.

The reviews section uses curated five-star Google reviews stored in `src/App.jsx`, so it has no third-party widget, API key, or billing dependency.

Restart the Vite server after changing environment variables. Run `npm run build` before deployment.

## Routes and GitHub Pages

The site uses clean client-side routes for `/attractions`, `/parties`, `/venue`, `/blog`, and `/faq`.
`public/404.html` and the early redirect-restoration script in `index.html` provide the GitHub Pages
SPA fallback, so direct links and browser refreshes continue to work after `npm run deploy`.
