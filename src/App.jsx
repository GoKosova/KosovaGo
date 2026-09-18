import { useMemo, useState } from "react";
import "./index.css";

const categories = ["Destinations", "Events", "Food", "Nightlife"];

const discovery = {
  Destinations: [
    { city: "Prizren", title: "Stone Bridge", meta: "Historic landmark", badge: "Must see", tone: "prizren" },
    { city: "Peja", title: "Rugova Gorge", meta: "Mountains & outdoors", badge: "Explore", tone: "rugova" },
    { city: "Prishtina", title: "NEWBORN Monument", meta: "Culture & city life", badge: "Popular", tone: "prishtina" },
    { city: "Deçan", title: "Deçan Monastery", meta: "Heritage & history", badge: "Historic", tone: "decan" },
  ],
  Events: [
    { city: "Across Kosovo", title: "Concerts & festivals", meta: "Current listings in one place", badge: "Updated", tone: "events" },
    { city: "Prishtina", title: "Tonight in the city", meta: "Live music, culture & more", badge: "Tonight", tone: "tonight" },
    { city: "Kosovo", title: "Sports fixtures", meta: "Football, basketball & volleyball", badge: "Live", tone: "sports" },
    { city: "Your city", title: "Weekend planner", meta: "See what is happening nearby", badge: "Discover", tone: "weekend" },
  ],
  Food: [
    { city: "Local favourite", title: "Flija", meta: "Traditional layered dish", badge: "Taste", tone: "flija" },
    { city: "Across Kosovo", title: "Qebapa", meta: "A classic worth seeking out", badge: "Local", tone: "qebapa" },
    { city: "Prishtina", title: "Coffee culture", meta: "Cafés, brunch and bakeries", badge: "Trending", tone: "coffee" },
    { city: "Your location", title: "Restaurants nearby", meta: "Browse by mood and cuisine", badge: "Near you", tone: "restaurant" },
  ],
  Nightlife: [
    { city: "Prishtina", title: "Clubs & late nights", meta: "Find the right atmosphere", badge: "Tonight", tone: "clubs" },
    { city: "Prizren", title: "Bars by the river", meta: "Relaxed evenings and music", badge: "Popular", tone: "bars" },
    { city: "Across Kosovo", title: "Live music", meta: "Gigs, DJs and performances", badge: "Live", tone: "music" },
    { city: "Your plans", title: "Save for later", meta: "Build your own night out", badge: "Favourites", tone: "saved" },
  ],
};

const cities = ["Prishtina", "Prizren", "Peja", "Gjakova", "Mitrovica", "Gjilan"];

function BrandMark({ compact = false }) {
  return <div className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-label="KosovaGo"><span className="brand-map">◆</span><span className="brand-g">G</span></div>;
}

function Icon({ name }) {
  const paths = {
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.2 8.8-2.1 4.3-4.3 2.1 2.1-4.3 4.3-2.1Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function KosovaGoLandingPage() {
  const [activeCategory, setActiveCategory] = useState("Destinations");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCards = useMemo(() => discovery[activeCategory], [activeCategory]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || status === "loading") return;
    setStatus("loading");
    try {
      const payload = (templateId) => ({ service_id: "service_8m7b6ng", template_id: templateId, user_id: "9_B6qxEZcglmkiKlb", template_params: { user_email: cleanEmail } });
      const responses = await Promise.all([
        fetch("https://api.emailjs.com/api/v1.0/email/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload("template_v9e7z3r")) }),
        fetch("https://api.emailjs.com/api/v1.0/email/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload("template_sqphrdq")) }),
      ]);
      if (responses.some((response) => !response.ok)) throw new Error("Email service request failed");
      setEmail(""); setStatus("sent");
    } catch (error) { console.error(error); setStatus("error"); }
  };

  return (
    <div className="site-shell">
      <header className="nav-shell">
        <a href="#top" className="wordmark"><BrandMark compact /><span>KosovaGo</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? "Close" : "Menu"}</button>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
          <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a><a href="#cities" onClick={() => setMenuOpen(false)}>Cities</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a className="nav-cta" href="#waitlist" onClick={() => setMenuOpen(false)}>Get early access</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> Built for tourists and locals</div>
            <h1>Kosovo,<br/><span>all in one place.</span></h1>
            <p>Discover where to go, what to eat and what is happening—without jumping between outdated blogs and scattered social posts.</p>
            <div className="hero-actions"><a className="button button--gold" href="#discover">Explore KosovaGo <Icon name="arrow" /></a><a className="button button--ghost" href="#waitlist">Join the waitlist</a></div>
            <div className="trust-row"><div className="avatar-stack"><span>PR</span><span>PZ</span><span>PE</span></div><p><strong>One country. Every experience.</strong><br/>Designed with local knowledge.</p></div>
          </div>
          <div className="phone-stage" aria-label="KosovaGo app preview">
            <div className="orbit orbit--one"/><div className="orbit orbit--two"/>
            <div className="phone-card">
              <div className="phone-top"><BrandMark compact/><span>9:41</span></div>
              <div className="phone-greeting"><small>Mirë se vini</small><h2>Explore Kosovo</h2></div>
              <div className="phone-search"><Icon name="search"/><span>Search places, events, food...</span></div>
              <div className="quick-grid"><div><Icon name="compass"/><span>Places</span></div><div><Icon name="calendar"/><span>Events</span></div><div><Icon name="pin"/><span>Nearby</span></div><div><Icon name="heart"/><span>Saved</span></div></div>
              <div className="phone-section-title"><strong>Featured now</strong><span>See all</span></div>
              <div className="feature-preview"><div><small>PRIZREN</small><strong>Culture around every corner</strong></div></div>
              <div className="phone-nav"><span className="active">⌂<small>Home</small></span><span>⌕<small>Discover</small></span><span>♡<small>Saved</small></span><span>○<small>Profile</small></span></div>
            </div>
            <div className="floating-note note-one"><Icon name="calendar"/><span><small>Plan tonight</small><strong>See what is on</strong></span></div>
            <div className="floating-note note-two"><Icon name="pin"/><span><small>Explore nearby</small><strong>Local favourites</strong></span></div>
          </div>
        </section>

        <section className="discover-section" id="discover"><div className="section-wrap">
          <div className="section-heading"><div><span className="section-kicker">Discover Kosovo your way</span><h2>Whatever you feel like doing,<br/>start here.</h2></div><p>Real places, current happenings and useful local recommendations brought together in one clean experience.</p></div>
          <div className="category-tabs" role="tablist">{categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="discovery-grid">{activeCards.map((item) => <article className="discovery-card" key={item.title}><div className={`card-visual tone-${item.tone}`}><span>{item.city}</span><b>{item.title.charAt(0)}</b></div><div className="card-content"><div><small>{item.city}</small><h3>{item.title}</h3><p>{item.meta}</p></div><span className="card-badge">{item.badge}</span></div></article>)}</div>
        </div></section>

        <section className="cities-section section-wrap" id="cities">
          <div className="section-heading compact"><div><span className="section-kicker">Explore by city</span><h2>Find your next stop.</h2></div><p>From lively capital streets to mountain gateways and historic old towns.</p></div>
          <div className="city-marquee">{cities.map((city, index) => <div key={city} className={`city-tile city-${index + 1}`}><span>0{index + 1}</span><strong>{city}</strong><small>Open guide <Icon name="arrow"/></small></div>)}</div>
        </section>

        <section className="about-section" id="about"><div className="section-wrap about-grid">
          <div><span className="section-kicker">Why KosovaGo</span><h2>Less searching.<br/>More experiencing.</h2><p>KosovaGo is being built as the practical local companion Kosovo deserves—clear, current and useful whether you live here or just landed.</p></div>
          <div className="benefit-list"><div><span>01</span><div><h3>Current, not forgotten</h3><p>Useful listings designed to stay relevant, particularly for events and nightlife.</p></div></div><div><span>02</span><div><h3>Local knowledge</h3><p>Discover the places and experiences that generic travel guides miss.</p></div></div><div><span>03</span><div><h3>Plan it your way</h3><p>Save favourites and build a Kosovo trip around what actually interests you.</p></div></div></div>
        </div></section>

        <section className="waitlist-section section-wrap" id="waitlist"><div className="waitlist-card">
          <div className="waitlist-copy"><BrandMark/><span className="section-kicker">Coming to mobile</span><h2>Be first to explore<br/>Kosovo differently.</h2><p>Join the early-access list for launch news and first access.</p></div>
          <form className="waitlist-form" onSubmit={handleSubmit}><label htmlFor="waitlist-email">Email address</label><div><input id="waitlist-email" type="email" required autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); if (status !== "idle") setStatus("idle"); }} placeholder="you@email.com"/><button type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining..." : status === "sent" ? "You're on the list" : "Join waitlist"}</button></div>{status === "sent" && <p className="form-message success">You’re in—check your inbox for confirmation.</p>}{status === "error" && <p className="form-message error">That didn’t go through. Please try again.</p>}<small>Only KosovaGo updates. No spam.</small></form>
        </div></section>
      </main>

      <footer className="footer section-wrap"><a href="#top" className="wordmark"><BrandMark compact/><span>KosovaGo</span></a><p>Discover Kosovo like a local.</p><div><a href="/privacy.html">Privacy</a><a href="mailto:gokosova@outlook.com">Contact</a><span>© {new Date().getFullYear()} KosovaGo</span></div></footer>
    </div>
  );
}
