import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/lasernobg.png'
import lasertag1 from './assets/lasertag1.webp'
import minigolf1 from './assets/minigolf1.webp'
import minigolf2 from './assets/minigolf2.webp'
import bdayroom from './assets/bdayroom.webp'
import cindyProfile from './assets/Cindy.png'
import bonnieProfile from './assets/bonnie.png'
import lauraProfile from './assets/laura.png'
import alexaProfile from './assets/alexa.png'
import venueVideo from './assets/laser-hero.mp4'

const EXPERIENCE_OPTIONS = [
  {
    id: 'mini-golf',
    title: 'Mini Golf 18 Holes',
    price: '$8',
    per: '',
    description: 'Play an 18-hole glowing mini golf round.',
    accent: 'var(--cyan)',
  },
  {
    id: 'laser-tag',
    title: 'Laser Tag Session 30 Minutes',
    price: '$10',
    per: '',
    description: 'Play a 30-minute laser tag session with blacklight targets and team play.',
    accent: 'var(--pink)',
  },
  {
    id: 'mini-golf-laser-tag-combo',
    title: 'Mini Golf and Laser Tag Combo',
    price: '$16',
    per: '',
    description: 'Bundle mini golf and laser tag into one visit.',
    accent: 'var(--gold)',
  },
]

const SLIDES = [
  { src: lasertag1, alt: 'Laser tag arena at Appalachian Asenso in Pennington Gap' },
  { src: minigolf1, alt: 'Indoor mini golf course at Appalachian Asenso' },
  { src: minigolf2, alt: 'Blacklight mini golf detail at Appalachian Asenso' },
  { src: bdayroom, alt: 'Birthday party room at Appalachian Asenso' },
]

const ATTRACTIONS = [
  {
    title: 'Indoor Mini Golf',
    copy: 'Play an 18-hole glowing mini golf course built for families, date nights, youth groups, and weekend outings in Pennington Gap.',
    image: minigolf1,
    imageAlt: 'Glowing indoor mini golf course',
    tag: '18 glowing holes',
    accent: 'var(--cyan)',
  },
  {
    title: 'Laser Tag',
    copy: 'Play a 30-minute laser tag session with blacklight targets, team play, and an indoor arena that works in any weather.',
    image: lasertag1,
    imageAlt: 'Blacklight laser tag arena',
    tag: '30-minute sessions',
    accent: 'var(--pink)',
  },
  {
    title: 'Birthday Parties',
    copy: 'Reserve a three-hour party with room time and up to 10 players, with extra players available for larger celebrations.',
    image: bdayroom,
    imageAlt: 'Birthday party room',
    tag: '3-hour reservation',
    accent: 'var(--gold)',
  },
  {
    title: 'Group Events',
    copy: 'Plan church groups, school groups, team parties, company outings, and private events for groups of 10 or more.',
    image: minigolf2,
    imageAlt: 'Blacklight mini golf area for groups',
    tag: 'Groups of 10+',
    accent: 'var(--lime)',
  },
]

const SERVICE_AREAS = ['Pennington Gap', 'Lee County', 'Jonesville', 'Big Stone Gap', 'Norton', 'Wise County']

const CLOSURE_NOTICE = 'We will be closed August 18–20. We look forward to welcoming you back on August 21.'

const FAQ_ITEMS = [
  {
    question: 'What are Appalachian Asenso open-play hours?',
    answer: 'Open play is Thursday and Friday from 3:00 PM–8:00 PM, and Saturday and Sunday from 1:00 PM–8:00 PM at Westgate Mall in Pennington Gap, Virginia. We are closed Monday through Wednesday. The venue will be closed August 18–20.',
  },
  {
    question: 'How much does mini golf or laser tag cost?',
    answer: 'Mini golf is $8, a 30-minute laser tag session is $10, and the mini golf plus laser tag combo is $16.',
  },
  {
    question: 'Do you host birthday parties?',
    answer: 'Yes. Birthday parties include three hours and up to 10 players. Weekday parties are $150, weekend parties are $200, and additional players are $5 each.',
  },
  {
    question: 'Can groups reserve outside open-play hours?',
    answer: 'Yes. Groups of 10 or more can request private time outside normal open-play hours using the party booking request form.',
  },
]

const FEATURED_REVIEWS = [
  {
    authorName: 'Cindy Nickodam',
    authorPhoto: cindyProfile,
    relativeTime: '6 months ago',
    rating: 5,
    text: 'Took the grandkids tonight. They had a blast playing putt putt and laser tag. Great to have a local place for the kids. Staff is super nice!',
  },
  {
    authorName: 'Bonnie Shortt',
    authorPhoto: bonnieProfile,
    relativeTime: '7 months ago',
    rating: 5,
    text: 'We had so much fun! Half of our group played putt putt and everyone played laser tag and capture the flag. The owner was very friendly and helpful. We would definitely visit again.',
  },
  {
    authorName: 'Laura Gardner',
    authorPhoto: lauraProfile,
    relativeTime: '7 months ago',
    rating: 5,
    text: 'Attended a birthday party here. We all loved the laser tag, all the grown-ups were playing and having a blast!! Don’t have any pictures, we were too busy playing! Mini golf is 18 holes and also great! Will definitely be back!',
  },
  {
    authorName: 'Alexa Slaughter',
    authorPhoto: alexaProfile,
    relativeTime: '7 months ago',
    rating: 5,
    text: 'A family oriented fun stop for those looking for something to do close to home! You can’t go anywhere else like this locally unless you’re driving an hour to get there. This place is great for those winter months birthdays too! Dylan & his wife are amazing people & will help with any questions you may have.',
  },
]

const BLOG_STOPS = [
  {
    number: '01',
    category: 'Coffee, Breakfast & Lunch',
    title: "Fuel Up at BB's Bakery & Cafe",
    businessName: "Visit BB's Bakery & Cafe",
    businessUrl: 'https://bbs-bakery.com/',
    paragraphs: [
      "Every great local adventure starts with great food, and there is no better place to kick things off than BB's Bakery & Cafe. Conveniently located right on Main Street, this cozy local favorite is one of the top places to eat in Pennington Gap. They serve up fresh-baked pastries, artisan espresso coffees, and a delicious lunch menu featuring signature items like their Chicken Salad Croissant and loaded wraps.",
      'Make sure to stop in early to grab one of their famous cinnamon rolls, a fresh Danish, or even a slice of their viral dot cakes before you head out for your afternoon activities!',
    ],
  },
  {
    number: '02',
    category: 'Indoor Family Entertainment',
    title: 'Team Up and Tee Off at Appalachian Asenso',
    businessName: 'Visit Appalachian Asenso',
    businessUrl: 'https://appalachianasenso.com/',
    hours: 'Thursday–Friday, 3–8 PM · Saturday–Sunday, 1–8 PM · Closed Monday–Wednesday · Closed Aug. 18–20',
    paragraphs: [
      'Once you are fully fueled, head over to Westgate Mall, Suite 104, to experience the ultimate indoor entertainment hub in Southwest Virginia: Appalachian Asenso. Open play is available Thursday and Friday from 3:00 PM–8:00 PM, and Saturday and Sunday from 1:00 PM–8:00 PM, with a temporary closure August 18–20, making it the perfect spot to burn off some energy and spark a little friendly competition. We are closed Monday through Wednesday.',

      'You can test your skills on the immersive, glowing 18-hole indoor mini golf course or gear up for an action-packed, 30-minute tactical laser tag session in a blacklight arena. If you can’t decide between the two, grab the combo pass to experience the best of both worlds! It’s an awesome option for rainy days, winter birthdays, or standard weekend fun.',
    ],
  },
  {
    number: '03',
    category: 'Fitness & Wellness',
    title: 'Unleash Your Strength at Fit & Fierce',
    businessName: 'Visit Fit & Fierce',
    businessUrl: 'https://fitandfierce.studio/',
    paragraphs: [
      'If your idea of a perfect day includes investing in your health and wellness, make time to connect with Fit & Fierce. As a premier destination for fitness coaching in the area, they specialize in personal training, small group classes, strength training, and women’s health. They are dedicated to helping you build confidence and resilience from the inside out.',
      'Whether you want to schedule a one-on-one session to master gym equipment properly or tap into their expert functional fitness guidance, it’s the perfect way to bring purpose, passion, and strong motivation to your regular routine.',
    ],
  },
  {
    number: '04',
    category: 'Frozen Treats & Drinks',
    title: 'Cool Down at Stone Mountain Yogurt',
    businessName: 'Visit Stone Mountain Yogurt',
    businessUrl: 'https://stone-mountain-yogurt.com/',
    paragraphs: [
      'After working up an appetite, head downtown to Stone Mountain Yogurt at 124 Main Street for a colorful local treat. Build your own frozen yogurt cup with favorite flavors and toppings, or try one of their candy-loaded creations for an extra-sweet break in the day.',
      'The menu goes beyond classic froyo with milkshakes, frappes, smoothies, floats, refreshers, parfaits, and other sweet add-ons. It’s a bright, family-friendly stop that makes it easy to cool down, recharge, and enjoy a little more time on Main Street before your final activity.',
    ],
  },
  {
    number: '05',
    category: 'Arts & Entertainment',
    title: 'Tap Into Your Creative Side at Painting Outside the Lines Studio',
    businessName: 'Visit Painting Outside the Lines',
    businessUrl: 'https://paintingoutsidethelinesstudios.com/',
    paragraphs: [
      'Wrap up your day by relaxing and letting your imagination run wild at Painting Outside the Lines Studio. Located at 140 Main Street, this fantastic paint-and-sip studio is a staple for local arts and entertainment, offering guided painting classes, social paint experiences, and specialized craft workshops like door hangers and crushed glass projects.',
      'The best part? You don’t need an ounce of prior art experience. Their expert instructors guide you step-by-step through the entire process, and all your art supplies and beverages are included in the ticket price. It’s a wonderful, stress-free environment to laugh with loved ones and leave with a handmade masterpiece.',
    ],
  },
]

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || 'https://formspree.io/f/maqgraew'
const VENUE_VIDEO_URL = import.meta.env.VITE_VENUE_VIDEO_URL?.trim() || venueVideo
const GOOGLE_LISTING_URL = 'https://www.google.com/maps/search/?api=1&query=Appalachian%20Asenso%2C%20282%20Westgate%20Mall%20Cir%20Ste%20104%2C%20Pennington%20Gap%2C%20VA%2024277'
const SITE_URL = 'https://appalachianasenso.com'

const PAGE_META = {
  '/': {
    title: 'Indoor Mini Golf, Laser Tag & Parties | Appalachian Asenso',
    description: 'Indoor mini golf, laser tag, birthday parties, and group events at Appalachian Asenso in Pennington Gap, Virginia.',
  },
  '/attractions': {
    title: 'Mini Golf and Laser Tag | Appalachian Asenso',
    description: 'Explore 18-hole indoor mini golf and 30-minute laser tag sessions at Appalachian Asenso in Pennington Gap, Virginia.',
  },
  '/parties': {
    title: 'Birthday Parties and Group Events | Appalachian Asenso',
    description: 'See birthday party pricing and request a private party or group event at Appalachian Asenso in Pennington Gap, Virginia.',
  },
  '/venue': {
    title: 'Venue Video and Gallery | Appalachian Asenso',
    description: 'Watch the venue video and explore the mini golf course, laser tag arena, and party room at Appalachian Asenso.',
  },
  '/blog': {
    title: 'A Perfect Day in Pennington Gap | Appalachian Asenso',
    description: 'Plan a Pennington Gap day trip with local food, family entertainment, wellness, treats, and creative activities.',
  },
  '/faq': {
    title: 'Hours, Pricing and FAQs | Appalachian Asenso',
    description: 'Find Appalachian Asenso hours, mini golf and laser tag pricing, party details, and group booking answers.',
  },
}

const HOME_LINKS = [
  {
    title: 'Mini Golf & Laser Tag',
    copy: 'Compare attractions, session details, and open-play pricing.',
    to: '/attractions',
    action: 'Explore attractions',
    image: minigolf1,
    imageAlt: 'Glowing mini golf course',
    accent: 'var(--cyan)',
  },
  {
    title: 'Birthday Parties',
    copy: 'See party packages, group details, and request a date.',
    to: '/parties',
    action: 'Plan a party',
    image: bdayroom,
    imageAlt: 'Appalachian Asenso party room',
    accent: 'var(--gold)',
  },
  {
    title: 'See The Venue',
    copy: 'Watch the venue video and browse the photo gallery.',
    to: '/venue',
    action: 'Take a look',
    image: lasertag1,
    imageAlt: 'Appalachian Asenso laser tag arena',
    accent: 'var(--pink)',
  },
  {
    title: 'Local Guide',
    copy: 'Build a full Pennington Gap day trip around five local stops.',
    to: '/blog',
    action: 'Read the guide',
    image: minigolf2,
    imageAlt: 'Colorful indoor mini golf course',
    accent: 'var(--lime)',
  },
]

const PAGE_HERO = {
  '/attractions': {
    eyebrow: 'Things To Do',
    title: 'Indoor mini golf and laser tag',
    copy: 'Choose an attraction or combine both into one indoor adventure at Westgate Mall.',
    image: minigolf1,
    imageAlt: 'Glowing 18-hole mini golf course at Appalachian Asenso',
    accent: '#22c8d8',
    highlights: ['18-hole mini golf', '30-minute laser tag', '$16 combo'],
  },
  '/parties': {
    eyebrow: 'Parties & Groups',
    title: 'Make the celebration easy',
    copy: 'See party pricing, group options, and send a quick request for your preferred date.',
    image: bdayroom,
    imageAlt: 'Birthday party room at Appalachian Asenso',
    accent: '#e7bc5e',
    highlights: ['3-hour party', '10 players included', 'Private group time'],
  },
  '/venue': {
    eyebrow: 'Take A Look Inside',
    title: 'Explore Appalachian Asenso',
    copy: 'Watch the venue video and browse the laser tag arena, mini golf course, and party room.',
    image: lasertag1,
    imageAlt: 'Blacklight laser tag arena at Appalachian Asenso',
    accent: '#e94c89',
    highlights: ['Indoor venue', 'All-weather fun', 'Westgate Mall'],
  },
  '/blog': {
    eyebrow: 'Local Guide',
    title: 'Five stops for a perfect day in Pennington Gap',
    copy: 'Plan a full local day with food, family fun, wellness, treats, and creativity.',
  },
  '/faq': {
    eyebrow: 'Plan Your Visit',
    title: 'Hours, pricing, and common questions',
    copy: 'Find the quick details you need before visiting, planning a party, or bringing a group.',
    image: minigolf2,
    imageAlt: 'Blacklight mini golf course at Appalachian Asenso',
    accent: '#45c878',
    highlights: ['Hours', 'Pricing', 'Reservations'],
  },
}

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, '')
  return path || '/'
}

function RouteLink({ to, navigate, children, ...props }) {
  function handleClick(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return

    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...props}>{children}</a>
}

function DeferredImage({ src, alt, ...props }) {
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  )
  const imageRef = useRef(null)

  useEffect(() => {
    if (shouldLoad || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '120px 0px' }
    )

    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading="lazy"
      {...props}
    />
  )
}

function StarRating({ rating }) {
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <span className="rating-stars" role="img" aria-label={`${normalizedRating} out of 5 stars`}>
      <span aria-hidden="true">★★★★★</span>
      <span
        className="rating-stars-fill"
        style={{ width: `${(normalizedRating / 5) * 100}%` }}
        aria-hidden="true"
      >
        ★★★★★
      </span>
    </span>
  )
}

function GoogleReviewsWidget() {
  return (
    <div className="custom-reviews">
      <div className="reviews-summary">
        <div>
          <span className="reviews-summary-label">Featured Google reviews</span>
          <div className="reviews-rating-line">
            <strong>5.0</strong>
            <StarRating rating={5} />
            <span>13 five-star Google reviews</span>
          </div>
        </div>
        <a className="btn-secondary" href={GOOGLE_LISTING_URL} target="_blank" rel="noreferrer">
          View all on Google
        </a>
      </div>

      <div className="review-card-grid">
        {FEATURED_REVIEWS.map(review => (
          <article className="review-card" key={review.authorName}>
            <div className="review-author-row">
              {review.authorPhoto ? (
                <img
                  className="review-author-photo"
                  src={review.authorPhoto}
                  alt={`${review.authorName} profile photo`}
                  width="44"
                  height="44"
                  loading="lazy"
                />
              ) : (
                <span className="review-author-placeholder" aria-hidden="true">
                  {review.authorName.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <strong>{review.authorName}</strong>
                <span>{review.relativeTime}</span>
              </div>
            </div>

            <StarRating rating={review.rating} />
            <p className="review-text">{review.text}</p>
          </article>
        ))}
      </div>

      <div className="google-maps-attribution">Reviews from Google Maps</div>
    </div>
  )
}

function DeferredReviews() {
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  )
  const containerRef = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin: '160px' }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="reviews-deferred-container">
      {isVisible ? <GoogleReviewsWidget /> : <div className="reviews-placeholder" aria-hidden="true" />}
    </div>
  )
}

export default function App({ initialPath }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [formStatus, setFormStatus] = useState('idle')
  const [blogOpen, setBlogOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(() => normalizePath(
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  ))
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  const bookingDialogRef = useRef(null)
  const lastFocusedElement = useRef(null)

  useEffect(() => {
    if (currentPath !== '/') return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSmallViewport = window.matchMedia('(max-width: 700px)').matches
    const savesData = navigator.connection?.saveData
    if (prefersReducedMotion || hasSmallViewport || savesData) return undefined

    let videoTimer

    function scheduleHeroVideo() {
      videoTimer = window.setTimeout(() => setHeroVideoReady(true), 750)
    }

    if (document.readyState === 'complete') {
      scheduleHeroVideo()
    } else {
      window.addEventListener('load', scheduleHeroVideo, { once: true })
    }

    return () => {
      window.removeEventListener('load', scheduleHeroVideo)
      window.clearTimeout(videoTimer)
    }
  }, [currentPath])

  useEffect(() => {
    if (currentPath !== '/venue') return undefined

    const timer = setInterval(() => setSlideIndex(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [currentPath])

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(normalizePath(window.location.pathname))
      setMenuOpen(false)
      window.scrollTo({ top: 0 })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const meta = PAGE_META[currentPath] || {
      title: 'Page Not Found | Appalachian Asenso',
      description: 'Visit Appalachian Asenso for indoor mini golf, laser tag, birthday parties, and group events.',
    }
    const canonicalUrl = `${SITE_URL}${currentPath === '/' ? '/' : currentPath}`

    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description)
  }, [currentPath])

  useEffect(() => {
    if (!menuOpen) return

    function closeMenuOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeMenuOnEscape)
    return () => document.removeEventListener('keydown', closeMenuOnEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!bookingOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    bookingDialogRef.current?.querySelector('input:not([type="hidden"])')?.focus()

    function handleDialogKeyDown(event) {
      if (event.key === 'Escape') {
        setBookingOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = bookingDialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
      )

      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleDialogKeyDown)
      lastFocusedElement.current?.focus()
    }
  }, [bookingOpen])

  function openBookingModal() {
    lastFocusedElement.current = document.activeElement
    setFormStatus('idle')
    setMenuOpen(false)
    setBookingOpen(true)
  }

  function navigate(to) {
    const nextPath = normalizePath(to)
    setMenuOpen(false)

    if (nextPath !== currentPath) {
      window.history.pushState({}, '', nextPath)
      setCurrentPath(nextPath)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleBookingSubmit(event) {
    event.preventDefault()

    if (!FORMSPREE_ENDPOINT) {
      setFormStatus('setup')
      return
    }

    const form = event.currentTarget
    setFormStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Unable to submit booking request')

      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="app-container">
      <div className="site-announcement" role="status" aria-live="polite">
        <div className="site-announcement-inner">
          <span className="announcement-tag">Closure Notice</span>
          <p>{CLOSURE_NOTICE}</p>
        </div>
      </div>
      {/* ── HEADER & NAV ── */}
      <header className="main-header">
        <div className="header-content">
          <RouteLink className="logo-brand" to="/" navigate={navigate} aria-label="Appalachian Asenso home">
            <img src={logo} alt="Appalachian Asenso" className="nav-logo" />
            <span className="brand-stack">
              <span className="brand-name">Appalachian Asenso</span>
              <span className="brand-location">Pennington Gap, VA</span>
            </span>
          </RouteLink>
          <button
            className={`mobile-menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(isOpen => !isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
          <nav
            id="primary-navigation"
            className={`desktop-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation"
          >
            <RouteLink to="/attractions" navigate={navigate} aria-current={currentPath === '/attractions' ? 'page' : undefined}>Attractions</RouteLink>
            <RouteLink to="/parties" navigate={navigate} aria-current={currentPath === '/parties' ? 'page' : undefined}>Parties</RouteLink>
            <RouteLink to="/venue" navigate={navigate} aria-current={currentPath === '/venue' ? 'page' : undefined}>Venue</RouteLink>
            <RouteLink to="/blog" navigate={navigate} aria-current={currentPath === '/blog' ? 'page' : undefined}>Blog</RouteLink>
            <RouteLink to="/faq" navigate={navigate} aria-current={currentPath === '/faq' ? 'page' : undefined}>FAQ</RouteLink>
            <button className="btn-nav-cta" type="button" onClick={openBookingModal}>Book a Party</button>
          </nav>
        </div>
      </header>

      <main className={`app-shell ${currentPath === '/' ? 'is-home' : ''}`}>
        {PAGE_HERO[currentPath] && currentPath !== '/blog' && (
          <section
            className="page-hero"
            aria-labelledby="page-title"
            style={{ '--page-accent': PAGE_HERO[currentPath].accent }}
          >
            <div className="page-hero-copy">
              <span className="eyebrow">{PAGE_HERO[currentPath].eyebrow}</span>
              <h1 id="page-title">{PAGE_HERO[currentPath].title}</h1>
              <p>{PAGE_HERO[currentPath].copy}</p>
              <div className="page-hero-highlights" aria-label="Page highlights">
                {PAGE_HERO[currentPath].highlights.map(highlight => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>
              {currentPath === '/parties' && (
                <button className="btn-primary" type="button" onClick={openBookingModal}>
                  Request a Party
                </button>
              )}
            </div>
            <div className="page-hero-visual">
              <img src={PAGE_HERO[currentPath].image} alt={PAGE_HERO[currentPath].imageAlt} />
              <div className="page-hero-photo-badge">
                <span>Appalachian Asenso</span>
                <strong>Pennington Gap, VA</strong>
              </div>
            </div>
          </section>
        )}

        {/* ── HERO ── */}
        {currentPath === '/' && (
          <section className="hero-panel hero-video-panel" aria-labelledby="home-hero-title">
            <img
              className="hero-background-poster"
              src={lasertag1}
              alt="Laser tag arena at Appalachian Asenso"
              width="1178"
              height="884"
              fetchPriority="high"
              aria-hidden="true"
            />
            {heroVideoReady && (
              <video
                className="hero-background-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex="-1"
              >
                <source src={VENUE_VIDEO_URL} type="video/mp4" />
              </video>
            )}
            <div className="hero-video-overlay" aria-hidden="true"></div>

            <div className="hero-copy">
              <div className="hero-overline">
                <span className="status-indicator"></span>
                Appalachian Asenso · Pennington Gap, VA
              </div>
              <h1 id="home-hero-title">
                Discover a brighter way to play in <span className="text-gradient">Pennington Gap.</span>
              </h1>
              <p className="hero-text">
                Glowing mini golf, action-packed laser tag, birthday parties, and private group fun—all under one roof.
              </p>
              <div className="hero-actions">
                <button className="btn-primary hero-book-button" type="button" onClick={openBookingModal}>
                  Book Now
                </button>
                <RouteLink className="btn-secondary" to="/attractions" navigate={navigate}>
                  Explore Attractions
                </RouteLink>
              </div>
              <div className="hero-quick-facts" aria-label="Venue highlights">
                <span>18-hole mini golf</span>
                <span>30-minute laser tag</span>
                <span>Open Sun–Sat</span>
              </div>
            </div>
          </section>
        )}

        {currentPath === '/' && (
          <section className="home-explore-section" aria-labelledby="home-explore-title">
            <div className="section-intro">
              <span className="eyebrow">Find It Fast</span>
              <h2 id="home-explore-title">Choose what you want to explore</h2>
              <p>Each part of the experience now has its own page with the details you need.</p>
            </div>
            <div className="attraction-grid">
              {HOME_LINKS.map(item => (
                <RouteLink
                  className="attraction-card home-link-card"
                  to={item.to}
                  navigate={navigate}
                  key={item.to}
                  style={{ '--card-accent': item.accent }}
                >
                  <div className="home-link-media">
                    <DeferredImage src={item.image} alt={item.imageAlt} />
                  </div>
                  <div className="home-link-body">
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <span>{item.action} <span aria-hidden="true">→</span></span>
                  </div>
                </RouteLink>
              ))}
            </div>
          </section>
        )}

        {/* ── ATTRACTIONS ── */}
        {currentPath === '/attractions' && (
          <section className="attractions-section" aria-labelledby="attractions-title">
          <div className="section-intro">
            <span className="eyebrow">Things To Do</span>
            <h2 id="attractions-title">Indoor fun for families, parties, and groups</h2>
            <p>
              Visit Appalachian Asenso for mini golf, laser tag, and private events in Pennington Gap.
              Open play is available Thursday and Friday from 3-8, and Saturday and Sunday from 1-8. We are closed Monday through Wednesday. Temporary closure on August 18–20.
              Parties or groups of 10+ can request time outside open-play hours using the booking form.
            </p>
          </div>
          <div className="attraction-grid">
            {ATTRACTIONS.map(attraction => (
              <article
                className="attraction-card attraction-detail-card"
                key={attraction.title}
                style={{ '--card-accent': attraction.accent }}
              >
                <div className="attraction-card-media">
                  <img src={attraction.image} alt={attraction.imageAlt} loading="lazy" />
                  <span>{attraction.tag}</span>
                </div>
                <div className="attraction-card-body">
                  <h3>{attraction.title}</h3>
                  <p>{attraction.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="local-service-panel">
            <div>
              <span className="eyebrow">Serving Southwest Virginia</span>
              <h3>Entertainment near Lee County, VA</h3>
              <p>
                Appalachian Asenso is located in Westgate Mall in Pennington Gap, making it a convenient
                indoor activity for families, birthday parties, school groups, church groups, and team events
                across far Southwest Virginia.
              </p>
            </div>
            <ul className="service-area-list" aria-label="Nearby service areas">
              {SERVICE_AREAS.map(area => <li key={area}>{area}</li>)}
            </ul>
          </div>
          </section>
        )}

        {/* ── VIDEO SHOWCASE ── */}
        {currentPath === '/venue' && (
          <section className="video-section" aria-labelledby="video-title">
          <div className="section-intro">
            <span className="eyebrow">See The Experience</span>
            <h2 id="video-title">Step inside Appalachian Asenso</h2>
            <p>
              Get a feel for the laser tag arena, glowing mini golf course, and party space before your visit.
            </p>
          </div>
          <div className="video-frame">
            {VENUE_VIDEO_URL ? (
              <video autoPlay muted loop playsInline preload="metadata" poster={lasertag1}>
                <source src={VENUE_VIDEO_URL} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            ) : (
              <div className="video-placeholder">
                <img src={lasertag1} alt="Laser tag arena video preview" />
                <div className="video-placeholder-overlay">
                  <span className="play-icon" aria-hidden="true"></span>
                  <strong>Venue video coming soon</strong>
                  <span>A full look at mini golf, laser tag, and parties is on the way.</span>
                </div>
              </div>
            )}
          </div>
          </section>
        )}

        {/* ── GOOGLE REVIEWS ── */}
        {currentPath === '/' && (
          <section className="reviews-section" aria-labelledby="reviews-title">
          <div className="section-intro">
            <span className="eyebrow">Guest Feedback</span>
            <h2 id="reviews-title">What visitors are saying</h2>
            <p>See recent Google reviews from families, party guests, and groups who visited the venue.</p>
          </div>
          <DeferredReviews />
          </section>
        )}

        {/* ── LOCAL GUIDE BLOG ── */}
        {currentPath === '/blog' && (
          <section className="blog-section" aria-labelledby="blog-title">
          <div className="blog-feature">
            <div className="blog-feature-copy">
              <span className="eyebrow">Local Guide</span>
              <h1 id="blog-title">Five stops for a perfect day in Pennington Gap</h1>
              <p>
                Great food, indoor family fun, purposeful movement, and a creative finish—all without
                leaving Lee County. Use this local itinerary to plan your next Pennington Gap day trip.
              </p>
              <div className="blog-meta" aria-label="Article details">
                <span>5 local stops</span>
                <span>Pennington Gap, VA</span>
                <span>Local day-trip guide</span>
              </div>
              <button
                className="btn-primary"
                type="button"
                aria-expanded={blogOpen}
                aria-controls="full-blog-post"
                onClick={() => setBlogOpen(isOpen => !isOpen)}
              >
                {blogOpen ? 'Close Full Blog' : 'View Full Blog'}
              </button>
            </div>

            <div className="blog-feature-aside">
              <div className="blog-feature-photo">
                <img src={minigolf1} alt="Glowing mini golf course at Appalachian Asenso" />
                <span>Start your local adventure</span>
              </div>
              <ol className="blog-route-preview" aria-label="Day-trip stops">
                {BLOG_STOPS.map(stop => (
                  <li key={stop.number}>
                    <span>{stop.number}</span>
                    <div>
                      <strong>{stop.title}</strong>
                      <small>{stop.category}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {blogOpen && (
            <article id="full-blog-post" className="blog-article">
              <header className="blog-article-header">
                <span className="eyebrow">Plan Your Pennington Gap Day Trip</span>
                <h2>Food, family fun, fitness, and creativity—all close to home</h2>
                <p>
                  You don’t need to drive over an hour away to build a memorable weekend. Here’s how to
                  spend a full day supporting local businesses and enjoying some of the best experiences
                  Pennington Gap has to offer.
                </p>
              </header>

              <div className="blog-stops">
                {BLOG_STOPS.map(stop => (
                  <section className="blog-stop" key={stop.number} aria-labelledby={`blog-stop-${stop.number}`}>
                    <span className="blog-stop-number" aria-hidden="true">{stop.number}</span>
                    <div className="blog-stop-body">
                      <span className="blog-stop-category">{stop.category}</span>
                      <h3 id={`blog-stop-${stop.number}`}>{stop.title}</h3>
                      {stop.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                      {stop.hours && (
                        <p className="business-hours">
                          <strong>Current hours:</strong> {stop.hours}
                        </p>
                      )}
                      <a
                        className="business-link"
                        href={stop.businessUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {stop.businessName} <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </section>
                ))}
              </div>

              <footer className="blog-conclusion">
                <span className="eyebrow">Support Local</span>
                <h3>Plan your Pennington Gap day trip today</h3>
                <p>
                  You don’t need to drive over an hour away to find high-quality family entertainment,
                  exceptional local food, or great wellness spaces. Spending your weekend at these local
                  businesses gives you a wonderful experience right here in Lee County while supporting
                  the people who make this community thrive.
                </p>
                <strong>
                  What are you planning to try first—the indoor laser tag arena, a fresh pastry,
                  a frozen yogurt creation, or a guided painting class?
                </strong>
                <button className="btn-primary" type="button" onClick={openBookingModal}>
                  Plan an Appalachian Asenso Party
                </button>
              </footer>
            </article>
          )}
          </section>
        )}

        {/* ── PRICING ── */}
        {currentPath === '/parties' && (
          <section className="booking-panel">
          <div className="section-intro">
            <span className="eyebrow">Pricing And Reservations</span>
            <h2>Party pricing and booking requests</h2>
            <p>
              Open play is available Sunday from 1-7, Monday through Friday from 3-7, and Saturday from 1-8, with a temporary closure on August 18–20. For birthday parties,
              groups of 10+, or private events, send a request below and the team will confirm availability.
            </p>
          </div>

          <div className="booking-info-grid">
            <div className="booking-info-card">
              <span className="info-label">Open Play</span>
              <strong>Sun, 1-7 / Mon-Fri, 3-7 / Sat, 1-8</strong>
              <p>Mini golf, laser tag, and combo passes are available during open-play hours. We are temporarily closed August 18–20.</p>
            </div>
            <div className="booking-info-card">
              <span className="info-label">Groups 10+</span>
              <strong>Any day, any time</strong>
              <p>Large groups can request a private booking outside open-play hours.</p>
            </div>
            <div className="booking-info-card">
              <span className="info-label">Parties</span>
              <strong>$150 weekday / $200 weekend</strong>
              <p>Includes 3 hours and up to 10 players. Additional players are $5 each.</p>
            </div>
          </div>

          <div className="booking-step">
            <div className="step-header">
              <h3>Experience Prices</h3>
            </div>
            <div className="booking-options">
              {EXPERIENCE_OPTIONS.map(item => (
                <article
                  key={item.id}
                  className="service-card"
                  style={{ '--card-accent': item.accent }}
                >
                  <div className="card-header">
                    <span className="service-title">{item.title}</span>
                    <div className="service-price">
                      <span className="amount">{item.price}</span>
                      <span className="duration">{item.per}</span>
                    </div>
                  </div>
                  <p className="service-desc">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="party-cta-card">
            <div>
              <span className="info-label">Ready To Celebrate?</span>
              <h3>Tell us about your party</h3>
              <p>Share your date, time, and group size in a quick booking request.</p>
            </div>
            <button className="btn-primary" type="button" onClick={openBookingModal}>
              Request a Party
            </button>
          </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {currentPath === '/faq' && (
          <section className="faq-section" aria-labelledby="faq-title">
          <div className="section-intro">
            <span className="eyebrow">Plan Your Visit</span>
            <h2 id="faq-title">Common questions</h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => (
              <article className="faq-item" key={item.question}>
                <span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="party-cta-card">
            <div>
              <span className="info-label">Still Have A Question?</span>
              <h3>Call or send a party request</h3>
              <p>For same-day availability, call (276) 345-3563.</p>
            </div>
            <button className="btn-primary" type="button" onClick={openBookingModal}>
              Request a Party
            </button>
          </div>
          </section>
        )}

        {/* ── VENUE SHOWCASE ── */}
        {currentPath === '/venue' && (
          <section className="slideshow-section">
          <div className="section-intro">
            <span className="eyebrow">The Venue</span>
            <h2>Appalachian Asenso at Westgate Mall</h2>
            <p>
              Explore the indoor laser tag arena, glowing mini golf course, and birthday party room before
              planning your visit to 282 Westgate Mall Cir, Ste 104 in Pennington Gap.
            </p>
          </div>
          <div className="slideshow-container">
            {SLIDES.map(({ src, alt }, i) => (
              <div
                key={i}
                className={`slide-item ${i === slideIndex ? 'is-visible' : ''}`}
              >
                <img src={src} alt={alt} />
                <div className="slide-overlay">
                  <span className="caption-text">{alt}</span>
                </div>
              </div>
            ))}
            <div className="pagination-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dot ${i === slideIndex ? 'is-active' : ''}`}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`View slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          </section>
        )}

        {!PAGE_META[currentPath] && (
          <section className="not-found-page">
            <span className="eyebrow">404</span>
            <h1>That page could not be found</h1>
            <p>The page may have moved. Head back home to explore Appalachian Asenso.</p>
            <RouteLink className="btn-primary" to="/" navigate={navigate}>Back To Home</RouteLink>
          </section>
        )}

      </main>

      {bookingOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setBookingOpen(false)
          }}
        >
          <section
            className="booking-modal"
            ref={bookingDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <header className="booking-modal-header">
              <div>
                <span className="info-label">Party Request Form</span>
                <h2 id="booking-modal-title">Tell us about the celebration</h2>
                <p>Send your preferred details and the team will follow up to confirm availability.</p>
              </div>
              <button
                className="modal-close"
                type="button"
                aria-label="Close party request form"
                onClick={() => setBookingOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="booking-modal-details" aria-label="Party package details">
              <span>3-hour reservation</span>
              <span>Up to 10 players</span>
              <span>$5 each additional player</span>
            </div>

            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <input type="hidden" name="_subject" defaultValue="New Appalachian Asenso party request" />
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Contact Name</label>
                  <input id="contact-name" name="contact_name" type="text" autoComplete="name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="phone-number">Phone Number</label>
                  <input id="phone-number" name="phone_number" type="tel" autoComplete="tel" required />
                </div>

                <div className="form-field">
                  <label htmlFor="email-address">
                    Email Address <span>(optional but recommended)</span>
                  </label>
                  <input id="email-address" name="email" type="email" autoComplete="email" />
                </div>

                <div className="form-field">
                  <label htmlFor="birthday-person">Birthday Person&apos;s Name</label>
                  <input id="birthday-person" name="birthday_person_name" type="text" required />
                </div>

                <div className="form-field">
                  <label htmlFor="party-date">Preferred Party Date</label>
                  <input id="party-date" name="preferred_party_date" type="date" min={new Date().toISOString().split('T')[0]} required />
                </div>

                <div className="form-field">
                  <label htmlFor="start-time">Preferred Start Time</label>
                  <input id="start-time" name="preferred_start_time" type="time" required />
                </div>

                <div className="form-field">
                  <label htmlFor="player-count">Expected Number of Players</label>
                  <input id="player-count" name="expected_player_count" type="number" min="1" step="1" inputMode="numeric" required />
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="special-requests">Special Requests <span>(optional)</span></label>
                  <textarea id="special-requests" name="special_requests" rows="4" maxLength="1000" />
                </div>
              </div>

              <div className="form-submit-row">
                <button className="btn-primary" type="submit" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending Request…' : 'Send Booking Request'}
                </button>
                <p className="form-note">Submitting this form is a request, not a confirmed reservation.</p>
              </div>

              {formStatus === 'success' && (
                <p className="form-message is-success" role="status">
                  Thanks! Your party request was sent. The team will be in touch to confirm availability.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="form-message is-error" role="alert">
                  We couldn&apos;t send your request. Please check your connection and try again.
                </p>
              )}
              {formStatus === 'setup' && (
                <p className="form-message is-error" role="alert">
                  Online requests are being connected. Please call (276) 345-3563 in the meantime.
                </p>
              )}
            </form>
          </section>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer id="contact" className="main-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="Appalachian Asenso logo" className="footer-logo" />
              <p>Indoor mini golf, laser tag, birthday parties, and group events in Pennington Gap, Virginia.</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Location</span>
              <p>282 Westgate Mall Cir, Ste 104<br/>Pennington Gap, VA 24277</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Contact</span>
              <a href="tel:+12763453563" className="footer-link">(276) 345-3563</a>
              <p>Call with venue questions or for same-day availability</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Hours</span>
              <p>Monday-Wednesday, Closed<br/>Thursday-Friday, 3-8<br/>Saturday-Sunday, 1-8<br/>Closed Aug. 18–20</p>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Appalachian Asenso. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
