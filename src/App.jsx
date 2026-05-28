import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import logo from './assets/lasernobg.png'
import lasertag1 from './assets/lasertag1.webp'
import minigolf1 from './assets/minigolf1.webp'
import minigolf2 from './assets/minigolf2.webp'
import bdayroom from './assets/bdayroom.webp'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

const STRIPE_LINKS = {
  'mini-golf': import.meta.env.VITE_STRIPE_LINK_MINI_GOLF,
  'laser-tag': import.meta.env.VITE_STRIPE_LINK_LASER_TAG,
  'mini-golf-laser-tag-combo': import.meta.env.VITE_STRIPE_LINK_COMBO,
}

const BOOKING_OPTIONS = [
  {
    id: 'mini-golf',
    title: 'Mini Golf 18 Holes',
    price: '$8',
    per: '',
    description: 'Reserve an 18-hole glowing mini golf round.',
    accent: 'var(--cyan)',
  },
  {
    id: 'laser-tag',
    title: 'Laser Tag Session 30 Minutes',
    price: '$10',
    per: '',
    description: 'Book a 30-minute laser tag session with blacklight targets and team play.',
    accent: 'var(--pink)',
  },
  {
    id: 'mini-golf-laser-tag-combo',
    title: 'Mini Golf and Laser Tag Combo',
    price: '$16',
    per: '',
    description: 'Bundle mini golf and a laser tag session into one visit.',
    accent: 'var(--gold)',
  },
]

const SLIDES = [
  { src: lasertag1, alt: 'Laser Tag Arena' },
  { src: minigolf1, alt: 'Mini Golf Hole' },
  { src: minigolf2, alt: 'Mini Golf Detail' },
  { src: bdayroom, alt: 'Birthday Party Room' },
]

function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toMonthValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatDate(isoDate) {
  return parseIsoDate(isoDate).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatMonth(date) {
  return date.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

export default function App() {
  const today = useMemo(() => new Date(), [])
  const tomorrow = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setDate(today.getDate() + 1)
    return today
  }, [])
  const minBookingDate = toIsoDate(tomorrow)
  const monthOptions = useMemo(() => {
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(start.getFullYear(), start.getMonth() + i, 1)
      return {
        value: toMonthValue(date),
        label: formatMonth(date),
        date,
      }
    })
  }, [today])

  const [selectedOption, setSelectedOption] = useState(BOOKING_OPTIONS[0].id)
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value)
  const [selectedDate, setSelectedDate] = useState(minBookingDate)
  const [paidBookings, setPaidBookings] = useState([])
  const [availabilityError, setAvailabilityError] = useState('')
  const [checkoutError, setCheckoutError] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const isDateBooked = useMemo(() => {
    return (isoDate, optionId = selectedOption) => paidBookings.some(booking => {
      if (booking.reserved_date !== isoDate) return false

      const services = [booking.service_type, optionId]
      return (
        booking.service_type === optionId ||
        services.includes('mini-golf-laser-tag-combo')
      )
    })
  }, [paidBookings, selectedOption])

  const calendarDays = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const daysInMonth = new Date(year, month, 0).getDate()
    const leadingEmptyDays = firstDay.getDay()

    return [
      ...Array.from({ length: leadingEmptyDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month - 1, i + 1)
        const isoDate = toIsoDate(date)
        return {
          isoDate,
          dayNumber: i + 1,
          weekday: date.toLocaleDateString(undefined, { weekday: 'short' }),
          isPast: isoDate < minBookingDate,
          isBooked: isDateBooked(isoDate),
        }
      }),
    ]
  }, [isDateBooked, minBookingDate, selectedMonth])

  const selectedMonthLabel = monthOptions.find(month => month.value === selectedMonth)?.label

  useEffect(() => {
    const timer = setInterval(() => setSlideIndex(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function loadPaidBookings() {
      if (!supabase) return

      const { data, error } = await supabase
        .from('bookings')
        .select('reserved_date, service_type')
        .eq('status', 'paid')

      if (error) {
        console.error('Availability load failed', error)
        setAvailabilityError('Availability could not be refreshed.')
        return
      }

      setPaidBookings(data ?? [])
      setAvailabilityError('')
    }

    loadPaidBookings()
  }, [])

  function handleMonthChange(event) {
    const monthValue = event.target.value
    const [year, month] = monthValue.split('-').map(Number)
    const firstOfMonth = toIsoDate(new Date(year, month - 1, 1))

    setSelectedMonth(monthValue)
    setSelectedDate(firstOfMonth < minBookingDate ? minBookingDate : firstOfMonth)
  }

  const option = BOOKING_OPTIONS.find(o => o.id === selectedOption)
  const selectedDateIsBooked = isDateBooked(selectedDate)

  async function handleCheckout() {
    setCheckoutError('')

    if (!option || selectedDateIsBooked || isCheckingOut) return
    if (!supabase) {
      setCheckoutError('Supabase is not configured yet.')
      return
    }

    const stripeLink = STRIPE_LINKS[selectedOption]
    if (!stripeLink) {
      setCheckoutError('Stripe checkout link is missing for this experience.')
      return
    }

    setIsCheckingOut(true)

    try {
      const bookingId = crypto.randomUUID()
      const { error } = await supabase
        .from('bookings')
        .insert({
          id: bookingId,
          reserved_date: selectedDate,
          service_type: selectedOption,
          status: 'pending',
        })

      if (error) {
        console.error('Pending booking creation failed', error)
        setCheckoutError('Could not start checkout. Please try again.')
        return
      }

      const checkoutUrl = new URL(stripeLink)
      checkoutUrl.searchParams.set('client_reference_id', bookingId)
      window.location.href = checkoutUrl.toString()
    } catch (error) {
      console.error('Checkout error', error)
      setCheckoutError('Could not start checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="app-container">
      {/* ── HEADER & NAV ── */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo-brand">
            <img src={logo} alt="Appalachian Asenso" className="nav-logo" />
            <span className="brand-name">Appalachian Asenso</span>
          </div>
          <nav className="desktop-nav">
            <a href="#venue">Venue</a>
            <a href="#contact">Contact</a>
            <a href="#booking" className="btn-nav-cta">Book Now</a>
          </nav>
        </div>
      </header>

      <main className="app-shell">
        {/* ── HERO ── */}
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="status-indicator"></span>
              Live Availability
            </div>
            <h1>Next-Level <br /><span className="text-gradient">Entertainment.</span></h1>
            <p className="hero-text">
              Immersive laser tag, glowing mini-golf, and combo passes. Reserve your time instantly online.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#booking">Book Experience</a>
              <a className="btn-secondary" href="#venue">View Gallery</a>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-icon">⭐</span> 5.0 Rated Venue
              </div>
              <div className="trust-item">
                <span className="trust-icon">📍</span> Westgate Mall, Ste 104
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow"></div>
            <img src={lasertag1} alt="Laser Tag Arena" className="hero-main-img" />
          </div>
        </section>

        {/* ── BOOKING ── */}
        <section id="booking" className="booking-panel">
          <div className="section-intro">
            <span className="eyebrow">Secure Your Spot</span>
            <h2>Online Reservations</h2>
          </div>

          <div className="booking-layout">
            <div className="booking-steps-container">
              
              {/* STEP 1 */}
              <div className="booking-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h3>Select Experience</h3>
                </div>
                <div className="booking-options">
                  {BOOKING_OPTIONS.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      className={`service-card ${item.id === selectedOption ? 'is-active' : ''}`}
                      onClick={() => setSelectedOption(item.id)}
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
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2 */}
              <div className="booking-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <div>
                    <h3>Choose Date</h3>
                    <p className="step-note">{selectedMonthLabel} availability</p>
                  </div>
                </div>
                <div className="calendar-toolbar">
                  <label className="month-select-label" htmlFor="booking-month">Month</label>
                  <select
                    id="booking-month"
                    className="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                  >
                    {monthOptions.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="calendar-weekdays" aria-hidden="true">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="date-selection-grid">
                  {calendarDays.map((date, index) => {
                    if (!date) {
                      return <span key={`empty-${index}`} className="date-cell date-cell-empty" />
                    }

                    const isSelected = date.isoDate === selectedDate
                    return (
                      <button
                        key={date.isoDate}
                        type="button"
                        className={`date-cell ${isSelected ? 'is-selected' : ''}`}
                        disabled={date.isPast || date.isBooked}
                        onClick={() => setSelectedDate(date.isoDate)}
                      >
                        <span className="day-name">{date.weekday}</span>
                        <span className="day-num">{date.dayNumber}</span>
                        <span className="open-tag">
                          {date.isPast ? 'Past' : date.isBooked ? 'Booked' : 'Open'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* CHECKOUT SIDEBAR */}
            <div className="checkout-column">
              <div className="reservation-summary">
                <h3 className="summary-title">Reservation Summary</h3>
                <div className="summary-box">
                  <div className="summary-row">
                    <span className="row-label">Experience</span>
                    <strong className="row-value">{option?.title}</strong>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">Date</span>
                    <strong className="row-value">{formatDate(selectedDate)}</strong>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span className="row-label">Total Due</span>
                    <strong className="row-value amount-large">{option?.price}</strong>
                  </div>
                </div>
                
                <div className={`availability-status ${selectedDateIsBooked ? 'status-error' : 'status-success'}`}>
                  {selectedDateIsBooked ? 'That date is already booked.' : 'Available for booking'}
                </div>
                {availabilityError && <div className="form-message">{availabilityError}</div>}
                {checkoutError && <div className="form-message status-error">{checkoutError}</div>}

                <button
                  type="button"
                  className="btn-checkout"
                  onClick={handleCheckout}
                  disabled={!option || selectedDateIsBooked || isCheckingOut}
                >
                  {isCheckingOut ? 'Starting Checkout...' : 'Proceed to Secure Checkout'}
                </button>
                <div className="secure-badge">🔒 Secure payment via Stripe</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VENUE SHOWCASE ── */}
        <section id="venue" className="slideshow-section">
          <div className="section-intro">
            <span className="eyebrow">The Venue</span>
            <h2>Premium Facilities</h2>
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
              <img src={logo} alt="Logo" className="footer-logo" />
              <p>The premier entertainment destination in Pennington Gap.</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Location</span>
              <p>282 Westgate Mall Cir, Ste 104<br/>Pennington Gap, VA 24277</p>
            </div>
            <div className="footer-nav">
              <span className="footer-heading">Contact</span>
              <a href="tel:+12763453563" className="footer-link">(276) 345-3563</a>
              <p>Call for same-day availability</p>
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
