import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/lasernobg.png'
import lasertag1 from './assets/lasertag1.webp'
import minigolf1 from './assets/minigolf1.webp'
import minigolf2 from './assets/minigolf2.webp'
import bdayroom from './assets/bdayroom.webp'

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
  },
  {
    title: 'Laser Tag',
    copy: 'Play a 30-minute laser tag session with blacklight targets, team play, and an indoor arena that works in any weather.',
  },
  {
    title: 'Birthday Parties',
    copy: 'Reserve a three-hour party with room time and up to 10 players, with extra players available for larger celebrations.',
  },
  {
    title: 'Group Events',
    copy: 'Plan church groups, school groups, team parties, company outings, and private events for groups of 10 or more.',
  },
]

const SERVICE_AREAS = ['Pennington Gap', 'Lee County', 'Jonesville', 'Big Stone Gap', 'Norton', 'Wise County']

const LOCAL_SECTIONS = [
  {
    title: 'Laser Tag in Pennington Gap',
    copy: 'Our indoor laser tag arena gives families, students, church groups, and teams a weather-proof activity close to Lee County. Sessions run 30 minutes and are easy to pair with mini golf for a longer visit.',
  },
  {
    title: 'Indoor Mini Golf Near Lee County',
    copy: 'The 18-hole glowing mini golf course is built for casual weekend play, date nights, youth outings, and family activities when you want something indoors in Pennington Gap.',
  },
  {
    title: 'Birthday Party Venue',
    copy: 'Birthday parties include three hours and up to 10 players, with extra players available for larger celebrations. Call to talk through the best time, player count, and party room availability.',
  },
  {
    title: 'Private Groups And Team Events',
    copy: 'Groups of 10 or more can request private time outside normal open-play hours for school groups, church events, company outings, team parties, and family gatherings.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What are Appalachian Asenso open-play hours?',
    answer: 'Open play is Friday, Saturday, and Sunday from 1-9 at Westgate Mall in Pennington Gap, Virginia.',
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
    answer: 'Yes. Groups of 10 or more can request private time outside normal open-play hours by calling (276) 345-3563.',
  },
]

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app-container">
      {/* ── HEADER & NAV ── */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo-brand">
            <img src={logo} alt="Appalachian Asenso" className="nav-logo" />
            <span className="brand-stack">
              <span className="brand-name">Appalachian Asenso</span>
              <span className="brand-location">Pennington Gap, VA</span>
            </span>
          </div>
          <nav className="desktop-nav">
            <a href="#attractions">Attractions</a>
            <a href="#parties">Parties</a>
            <a href="#venue">Venue</a>
            <a href="#contact">Contact</a>
            <a href="tel:+12763453563" className="btn-nav-cta">Call Us</a>
          </nav>
        </div>
      </header>

      <main className="app-shell">
        {/* ── HERO ── */}
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="status-indicator"></span>
              Friday-Sunday Open Play
            </div>
            <h1>Mini Golf and Laser Tag in <span className="text-gradient">Pennington Gap, VA.</span></h1>
            <p className="hero-text">
              Appalachian Asenso is an indoor entertainment venue at Westgate Mall with 18-hole mini golf,
              30-minute laser tag sessions, combo passes, birthday parties, and private group bookings.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="tel:+12763453563">Call to Plan a Visit</a>
              <a className="btn-secondary" href="#venue">View Gallery</a>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-kicker">Rated</span>
                <strong>5.0 Venue</strong>
              </div>
              <div className="trust-item">
                <span className="trust-kicker">Located</span>
                <strong>Westgate Mall, Ste 104</strong>
              </div>
              <div className="trust-item">
                <span className="trust-kicker">Call</span>
                <strong>(276) 345-3563</strong>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow"></div>
            <img
              src={lasertag1}
              alt="Indoor laser tag arena at Appalachian Asenso in Pennington Gap, Virginia"
              className="hero-main-img"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* ── ATTRACTIONS ── */}
        <section id="attractions" className="attractions-section" aria-labelledby="attractions-title">
          <div className="section-intro">
            <span className="eyebrow">Things To Do</span>
            <h2 id="attractions-title">Indoor fun for families, parties, and groups</h2>
            <p>
              Visit Appalachian Asenso for mini golf, laser tag, and private events in Pennington Gap.
              Weekend open play is available Friday-Sunday from 1-9, and parties or groups of 10+
              can reserve outside open-play hours by phone.
            </p>
          </div>
          <div className="attraction-grid">
            {ATTRACTIONS.map(attraction => (
              <article className="attraction-card" key={attraction.title}>
                <h3>{attraction.title}</h3>
                <p>{attraction.copy}</p>
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

        {/* ── LOCAL SEARCH CONTENT ── */}
        <section id="parties" className="local-search-section" aria-labelledby="local-search-title">
          <div className="section-intro">
            <span className="eyebrow">Laser Tag, Mini Golf, Parties</span>
            <h2 id="local-search-title">A local indoor entertainment spot for Southwest Virginia</h2>
            <p>
              Appalachian Asenso gives Pennington Gap, Lee County, Jonesville, Big Stone Gap, Norton,
              and nearby Southwest Virginia families a place for indoor mini golf, laser tag,
              birthday parties, and private group events.
            </p>
          </div>
          <div className="local-search-grid">
            {LOCAL_SECTIONS.map(section => (
              <article className="local-search-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="booking-panel">
          <div className="section-intro">
            <span className="eyebrow">Pricing And Reservations</span>
            <h2>Mini golf, laser tag, parties, and groups</h2>
            <p>
              Weekend open play is available Friday-Sunday from 1-9. For birthday parties,
              groups of 10+, private events, or same-day availability, call the venue directly.
            </p>
          </div>

          <div className="booking-info-grid">
            <div className="booking-info-card">
              <span className="info-label">Open Play</span>
              <strong>Friday-Sunday, 1-9</strong>
              <p>Mini golf, laser tag, and combo passes are available during weekend open-play hours.</p>
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

          <div className="reservation-callout">
            <div>
              <span className="info-label">Reservations By Phone</span>
              <h3>Call for parties, groups, private events, and availability</h3>
              <p>
                Parties include 3 hours and up to 10 players. Additional players are $5 each.
                Weekday parties are $150 and weekend parties are $200.
              </p>
            </div>
            <a className="btn-call" href="tel:+12763453563">(276) 345-3563</a>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section" aria-labelledby="faq-title">
          <div className="section-intro">
            <span className="eyebrow">Plan Your Visit</span>
            <h2 id="faq-title">Common questions</h2>
          </div>
          <div className="faq-list">
            {FAQ_ITEMS.map(item => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── VENUE SHOWCASE ── */}
        <section id="venue" className="slideshow-section">
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

      </main>

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
              <p>Call for parties, groups of 10+, and same-day availability</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Hours</span>
              <p>Open play Friday-Sunday, 1-9<br/>Private bookings available by request</p>
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
