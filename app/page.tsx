'use client'

import { useEffect, useRef, useState } from 'react'
import PixelRain from '@/components/pixel-rain'
import ContactSection from '@/components/contact-section'
import WorkTimeline from '@/components/work-timeline'

/* ────────────────────────────────────────────────
   Kabilan Sakthivel — Senior Product Security Engineer
   security research & vulnerability portfolio
   ──────────────────────────────────────────────── */

const NAV_ITEMS = [
  { s: 1, label: '[ profile ]' },
  { s: 2, label: '[ impact ]' },
  { s: 3, label: '[ work ]' },
  { s: 4, label: '[ talks ]' },
  { s: 5, label: '[ contact me ]' },
]

const IMPACT_POSTS = [
  {
    id: 1,
    title: 'PR Newswire: MCP API Security Breach in Comet Browser',
    url: 'https://www.prnewswire.com/news-releases/obscure-mcp-api-in-comet-browser-breaches-user-trust-enabling-full-device-control-via-ai-browsers-302620308.html',
    description: 'Media coverage of critical vulnerability enabling full device control via AI browsers',
    image: 'https://mma.prnewswire.com/media/2827444/Picture1.jpg?p=facebook',
  },
  {
    id: 2,
    title: 'Silent Sabotage: How Hidden Prompts Can Hijack AI Summaries',
    url: 'https://blog.game0v3r.in/blog/ai-silent-sabotage',
    description: 'Research on invisible prompt injection attacks targeting AI summarization tools using CSS techniques to embed malicious instructions',
    image: '',
  },
  {
    id: 3,
    title: 'GhostPoster Never Dies: 100K+ Users Affected With New Variant',
    url: 'https://browserextensionanalyzer.com/blogs/ghost-poster-never-dies',
    description: 'Analysis of WhatsUp+ malicious Chrome extension using image-based steganography for command-and-control targeting WhatsApp Web users',
    image: 'https://browserextensionanalyzer.com/static/images/blog/ghost-poster-hero-placeholder.webp',
  },
  {
    id: 4,
    title: 'AI Browser Vulnerabilities Research',
    url: 'https://sqrx.com/ai-browser-vulnerabilities',
    description: 'Comprehensive research on vulnerabilities in AI-enhanced browser environments',
    image: 'https://sqrx.com/static/img/ai-browser-vuln/AI-Browsers-03.webp',
  },
  {
    id: 5,
    title: 'AI Sidebar Spoofing Attack Pattern',
    url: 'https://sqrx.com/ai-sidebar-spoofing',
    description: 'Novel browser extension attack pattern targeting AI sidebar interfaces',
    image: 'https://sqrx.com/static/img/ai-sidebar-spoofing/AI-Sidebar-Spoofing.webp',
  },
  {
    id: 6,
    title: 'Comet MCP API Vulnerability Discovery',
    url: 'https://sqrx.com/comet-mcp-api-vulnerability',
    description: 'Critical RCE vulnerability discovered in Perplexity Comet AI browser',
    image: 'https://sqrx.com/static/img/comet-mcp-api-vulnerability/Comet_Malware_02.webp',
  },
  {
    id: 7,
    title: 'SiliconANGLE: Hidden API Enables Device Takeover',
    url: 'https://siliconangle.com/2025/11/19/squarex-warns-hidden-api-perplexitys-comet-browser-enables-full-device-takeover/',
    description: 'Industry coverage of Perplexity Comet browser security vulnerability',
    image: 'https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2025/11/YOBB_Comet-Allows-AI-Browsers-to-Execute-Local-Commands_Hero-Image_1200x720px_01.jpg',
  },
  {
    id: 8,
    title: 'CVE-2024-32838: Apache Fineract SQL Injection',
    url: 'https://app.opencve.io/cve/CVE-2024-32838',
    description: 'SQL injection vulnerability discovered in Apache Fineract',
    image: 'https://app.opencve.io/static/img/logo_opencve_white.svg',
  },
  {
    id: 9,
    title: 'CVE-2026-6339: Mattermost Server Validation Error',
    url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-6339/',
    description: 'Origin validation error in Mattermost Server burn-on-read reveal endpoint',
    image: 'https://images.contentstack.io/v3/assets/blt53c99b43892c2378/blt80600f8100309753/6967aa812269f800082a0705/FY25_Homepage_SocialCard.jpg',
  },
  {
    id: 10,
    title: 'CVE-2026-8683: Mattermost Desktop Insecure Permission',
    url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-8683/',
    description: 'Insecure permissions vulnerability in Mattermost Desktop application',
    image: 'https://images.contentstack.io/v3/assets/blt53c99b43892c2378/blt80600f8100309753/6967aa812269f800082a0705/FY25_Homepage_SocialCard.jpg',
  },
  {
    id: 11,
    title: 'CVE-2026-3471: Mattermost Desktop Authorization Issue',
    url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-3471/',
    description: 'Improper authorization in Mattermost Desktop custom URL scheme handler',
    image: 'https://images.contentstack.io/v3/assets/blt53c99b43892c2378/blt80600f8100309753/6967aa812269f800082a0705/FY25_Homepage_SocialCard.jpg',
  },
  {
    id: 12,
    title: 'QVI Streaming Identity Theft: 60 Extensions Steal 1.1M Users Data',
    url: 'https://browserextensionanalyzer.com/blogs/qvi-streaming-identity-theft',
    description: 'Investigation revealing how 60 Chrome extensions harvested sensitive information from streaming subscribers through surveillance infrastructure',
    image: 'https://browserextensionanalyzer.com/static/images/blog/qvi-image.jpg',
  },
  {
    id: 13,
    title: 'Hidden in Plain Sight: Multi-Extension Malware Campaign',
    url: 'https://browserextensionanalyzer.com/blogs/multi-extension-campaign',
    description: 'Coordinated campaign uncovered involving three malicious Chrome extensions stealing authentication data from cryptocurrency trading platforms',
    image: 'https://browserextensionanalyzer.com/static/images/blog/hero_image.webp',
  },
]

const WORK = [
  {
    key: 'zscaler',
    title: 'Zscaler',
    role: 'Product Security Engineer (Security Researcher)',
    period: 'Feb 2026 – Present',
    img: '/zscaler.png',
    cves: [
      { id: 'CVE-2026-6339', url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-6339/' },
      { id: 'CVE-2026-8683', url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-8683/' },
      { id: 'CVE-2026-3471', url: 'https://www.sentinelone.com/vulnerability-database/cve-2026-3471/' },
    ],
    description: [
      'Leading security posture management and risk assessment for the SquareX acquisition integration, coordinating alignment of security controls and compliance frameworks across merged infrastructure',
      'Worked on "Mythos" to create an automated vulnerability reproduction and remediation harness, standardising the security assessment workflow across teams and reducing manual triage effort by 80%',
      'Develop remediation guidance and fix recommendations for vulnerabilities identified across integrated platforms, partnering directly with engineering to close gaps',
      'Lead cross-functional security initiatives during the acquisition transition, working with compliance, engineering, and product stakeholders to maintain enterprise wide security posture',
    ],
  },
  {
    key: 'squarex',
    title: 'SquareX',
    role: 'Product Security Engineer (Security Researcher)',
    period: 'Sep 2025 – Feb 2026',
    img: '/squarex.png',
    acquisition: 'Acquired by Zscaler, February 2026',
    description: [
      'Led "Year of Browser Bugs," a research initiative analyzing attack surfaces in AI-enhanced browsing environments to directly inform the product security roadmap and defensive control development',
      'Identified a critical RCE vulnerability in the Perplexity Comet AI browser\'s MCP API integration and worked with the vendor through disclosure to validate fixes and close the attack chain',
      'Designed and published "AI Sidebar Spoofing," a novel browser extension attack pattern, contributing to browser defense research (BDR) guidelines used to harden product-facing controls',
      'Partnered with cross-functional engineering teams to translate offensive research findings into detection and prevention mechanisms for browser-based AI threats',
    ],
  },
  {
    key: 'zoho',
    title: 'Zoho Corporation',
    role: 'Red Teamer',
    period: 'Jul 2022 – Sep 2025',
    img: '/zoho.png',
    cves: [
      { id: 'CVE-2024-32838', url: 'https://app.opencve.io/cve/CVE-2024-32838' },
    ],
    description: [
      'Conducted penetration testing across web applications, internal networks, and cloud environments, delivering risk-prioritized remediation guidance to engineering teams',
      'Designed and ran phishing simulation campaigns to assess organizational security awareness, informing company-wide security training programs',
      'Built and ran the internal vulnerability triage process — analyzing reported issues, prioritizing by business risk, and collaborating with development teams on remediation timelines',
      'Delivered detailed security assessment reports and risk documentation that shaped organization wide security best practices',
    ],
  },
]

const ACHIEVEMENTS = [
  { year: '2024', title: 'Groww Live Hacking Event - Most Valuable Hacker', url: 'https://www.linkedin.com/posts/kabilan-s-4b8a90173_livehacking-bugbounty-bugbase-activity-7323215328765759489-3qE4' },
  { year: '2022', title: 'TCS HackQuest Season 6 - Title Winner', url: 'https://www.linkedin.com/feed/update/urn:li:activity:6912621009028206592/' },
  { year: '2022', title: 'CCoE Hyderabad Great AppSec Hackathon - Top 10', url: 'https://www.linkedin.com/feed/update/urn:li:activity:6874677941771620352/' },
  { year: '2021', title: 'OSRC - Top 20 Most Valuable Researcher', url: 'https://www.linkedin.com/posts/kabilan-s-4b8a90173_oppo-bughunting-securityresearch-activity-6700095376403382272-QyV1' },
  { year: '2021', title: 'OWASP Las Vegas CTF - Winner (Top 1)', url: 'https://www.linkedin.com/posts/kabilan-s-4b8a90173_hacking-cybersecurity-bughunting-activity-6704721263308369920-tTql' },
  { year: '2021', title: 'OSRC Yearly Leaderboard - Top 9', url: 'https://security.oppo.com/en/charts' },
  { year: '2020-21', title: 'NOVA CTF - Winner', url: 'https://www.linkedin.com/posts/kabilan-s-4b8a90173_cybersecurity-event-technology-activity-6784495285969276928-Ze6W' },
  { year: '2020', title: 'OSRC Yearly Leaderboard - Top 10', url: 'https://security.oppo.com/en/charts' },
  { year: '2019', title: 'Tamil Nadu Police Hackathon - Winner', url: 'https://www.linkedin.com/posts/kabilan-s-4b8a90173_bugbounty-bounty-penetrationtesting-activity-6604713886455291904-2vyS' },
]

const TALKS = [
  {
    id: 1,
    title: 'Breaking AI Browsers: Hidden APIs, Agentic Chaos, and the Race Toward Secure Architecture',
    url: 'https://nullcon.net/talk/breaking-ai-browsers-hidden-apis-agentic-chaos-and-the-race-toward-secure-architecture/',
    description: 'Conference talk at Nullcon on AI browser security vulnerabilities and architectural security challenges',
  },
  {
    id: 2,
    title: 'Breaking AI Browsers',
    url: 'https://bsideskerala.in/speakers/2026/kabilan-sakthivel/',
    description: 'Conference talk at BSides Kerala 2026 on AI browser security vulnerabilities',
  },
  {
    id: 3,
    title: 'HTML Parsers, Mutation & the Road to mXSS',
    url: 'https://www.linkedin.com/posts/rootecstak_websecurity-mxss-htmlparsers-activity-7290020863049940992--oi8',
    description: 'Talk at IIT Madras on HTML parser mutation vulnerabilities and mutation-based XSS attacks',
  },
]

const TAGLINE = 'senior security researcher.'

export default function Page() {
  const [entered, setEntered] = useState(true)
  const [activeSec, setActiveSec] = useState(1)
  const [typed, setTyped] = useState('')

  const scrollerRef = useRef<HTMLDivElement>(null)

  /* ── typewriter tagline after entering ── */
  useEffect(() => {
    if (!entered) return
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) clearInterval(t)
    }, 42)
    return () => clearInterval(t)
  }, [entered])

  /* ── scroll-driven fade + active nav ── */
  useEffect(() => {
    if (!entered) return
    const scroller = scrollerRef.current
    if (!scroller) return

    function updateFade() {
      const vh = scroller!.clientHeight
      const center = vh * 0.45
      const range = vh * 0.55
      const items = scroller!.querySelectorAll<HTMLElement>('.fade-row')
      for (let i = 0; i < items.length; i++) {
        const el = items[i]
        const r = el.getBoundingClientRect()
        const ey = r.top + r.height / 2
        const dist = Math.abs(ey - center)
        const t = 1 - Math.min(dist / range, 1)
        const fade = 0.08 + t * 0.92
        el.style.setProperty('--fade', fade.toFixed(3))
      }
    }

    function updateActiveNav() {
      const vh = scroller!.clientHeight
      const mid = vh / 2
      let closestIdx = 1
      let closestDist = Infinity
      scroller!.querySelectorAll<HTMLElement>('.sec').forEach((sec) => {
        const r = sec.getBoundingClientRect()
        const secMid = r.top + r.height / 2
        const dist = Math.abs(secMid - mid)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = Number(sec.dataset.idx)
        }
      })
      setActiveSec(closestIdx)
    }

    let ticking = false
    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          updateFade()
          updateActiveNav()
          ticking = false
        })
      }
    }

    updateFade()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [entered])

  const scrollToSec = (s: number) => {
    const sec = document.getElementById('sec' + s)
    if (sec) sec.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <PixelRain />

      {/* ═══ PORTFOLIO ═══ */}
      <div id="portfolio" className={`portfolio${entered ? ' show' : ''}`}>
        <nav className="sidenav" aria-label="section navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.s}
              type="button"
              className={`nav-link${activeSec === item.s ? ' active' : ''}`}
              onClick={() => scrollToSec(item.s)}
            >
              <span className="nav-label">{item.label}</span>
              <span className="nav-pip">{activeSec === item.s ? '■' : '□'}</span>
            </button>
          ))}
        </nav>

        <div className="scroller" ref={scrollerRef}>
          {/* 1 — profile / hero */}
          <section className="sec" id="sec1" data-idx="1">
            <div className="sec-inner">
              <pre className="ascii-header fade-row">{`┌──────────────────────────────────┐
│  PROFILE - KABILAN SAKTHIVEL     │
└──────────────────────────────────┘`}</pre>
              <div className="profile-head fade-row">
                <img src="/profile.jpeg" alt="Kabilan Sakthivel avatar" className="profile-av" />
                <div>
                  <div className="profile-name-wrapper">
                    <h1 className="profile-name">KABILAN SAKTHIVEL</h1>
                    <span className="profile-badge">game0v3r</span>
                  </div>
                  <p className="profile-tagline" aria-label={TAGLINE}>
                    {typed}
                    <span className="blink-cursor">_</span>
                  </p>
                  <p className="profile-status">
                    <span className="status-dot" />
                    Open to Opportunities
                  </p>
                </div>
              </div>
              <p className="hero-bio fade-row text-pretty">
                Senior security researcher with 8+ years experience in information security and 4+ years of work experience spanning red teaming, vulnerability research, and enterprise security operations. Focused on building secure-by-design product architecture and vulnerability management programs. Deep expertise in browser security, AI application security, and client-side attack surfaces.
              </p>
              <div className="hero-ctas fade-row">
                <button type="button" className="hero-btn hero-btn-primary" onClick={() => scrollToSec(3)}>
                  [ view work ]
                </button>
                <a href="https://blog.game0v3r.in" target="_blank" rel="noopener noreferrer" className="hero-btn">
                  [ blog ]
                </a>
                <button type="button" className="hero-btn" onClick={() => scrollToSec(5)}>
                  [ contact me ]
                </button>
              </div>
              <pre className="ascii-footer fade-row">
                ════════════════════════════════════
              </pre>
            </div>
          </section>

          {/* 2 — impact */}
          <section className="sec" id="sec2" data-idx="2">
            <div className="sec-inner">
              <pre className="ascii-header fade-row">{`┌──────────────────────────────────┐
│  IMPACT  //  research & writing  │
└──────────────────────────────────┘`}</pre>
              <div className="impact-grid">
                {IMPACT_POSTS.map((post) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="impact-card fade-row"
                  >
                    <div className="impact-card-inner">
                      <h3 className="impact-title">{post.title}</h3>
                      {post.description && (
                        <p className="impact-desc">{post.description}</p>
                      )}
                      <div className="impact-footer">
                        <span className="impact-link-text">[ read more ]</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 3 — work */}
          <section className="sec" id="sec3" data-idx="3">
            <div className="sec-inner">
              <pre className="ascii-header fade-row">{`┌──────────────────────────────────┐
│  WORK EXPERIENCE  //  timeline   │
└──────────────────────────────────┘`}</pre>
              <WorkTimeline work={WORK} />

              <div className="achievements-section fade-row">
                <div className="achievements-header">
                  <h2 className="achievements-title">Independent Security Researcher</h2>
                  <p className="achievements-period">Jan 2019 – Present</p>
                </div>
                <div className="achievements-label">Recognition & Awards:</div>
                <div className="achievements-grid">
                  {ACHIEVEMENTS.map((achievement) => (
                    <a
                      key={`${achievement.year}-${achievement.title}`}
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="achievement-card"
                    >
                      <span className="achievement-card-year">{achievement.year}</span>
                      <span className="achievement-card-title">{achievement.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4 — talks */}
          <section className="sec" id="sec4" data-idx="4">
            <div className="sec-inner">
              <pre className="ascii-header fade-row">{`┌──────────────────────────────────┐
│  TALKS  //  conference & events  │
└──────────────────────────────────┘`}</pre>
              <div className="impact-grid">
                {TALKS.map((talk) => (
                  <a
                    key={talk.id}
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="impact-card fade-row"
                  >
                    <div className="impact-card-inner">
                      <h3 className="impact-title">{talk.title}</h3>
                      {talk.description && (
                        <p className="impact-desc">{talk.description}</p>
                      )}
                      <div className="impact-footer">
                        <span className="impact-link-text">[ view details ]</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 5 — contact */}
          <section className="sec" id="sec5" data-idx="5">
            <div className="sec-inner">
              <pre className="ascii-header fade-row">{`┌──────────────────────────────────┐
│  CONTACT ME  //  channels        │
└──────────────────────────────────┘`}</pre>
              <ContactSection />
              <pre className="ascii-footer fade-row">
                ════════════════════════════════════
              </pre>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
