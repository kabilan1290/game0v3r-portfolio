'use client'

import { useEffect, useRef, useState } from 'react'

interface WorkItem {
  key: string
  title: string
  role: string
  period: string
  img: string
  description: string[]
  acquisition?: string
  cves?: { id: string; url: string }[]
  achievements?: { year: string; title: string; url: string }[]
}

interface WorkTimelineProps {
  work: WorkItem[]
}

export default function WorkTimeline({ work }: WorkTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-idx'))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(idx))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    )

    const items = timelineRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="work-timeline" ref={timelineRef}>
      <div className="timeline-line" />
      {work.map((item, idx) => (
        <div
          key={item.key}
          className={`timeline-item${visibleItems.has(idx) ? ' visible' : ''}`}
          data-idx={idx}
        >
          <div className="timeline-dot">
            <div className="timeline-dot-inner" />
          </div>
          <div className="timeline-content">
            <div className="timeline-header">
              <div className="timeline-company">
                <img src={item.img} alt={item.title} className="timeline-logo" />
                <div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-role">{item.role}</p>
                  <p className="timeline-period">{item.period}</p>
                  {item.acquisition && (
                    <p className="timeline-acquisition">{item.acquisition}</p>
                  )}
                </div>
              </div>
            </div>
            {item.cves && item.cves.length > 0 && (
              <div className="timeline-cves">
                <div className="cve-label">Vulnerabilities Discovered:</div>
                <div className="cve-list">
                  {item.cves.map((cve) => (
                    <a
                      key={cve.id}
                      href={cve.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cve-badge"
                    >
                      {cve.id}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {item.achievements && item.achievements.length > 0 && (
              <div className="timeline-achievements">
                <div className="achievement-label">Hall of Fame Recognition:</div>
                <div className="achievement-list">
                  {item.achievements.map((achievement) => (
                    <a
                      key={achievement.year}
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="achievement-badge"
                    >
                      <span className="achievement-year">{achievement.year}</span>
                      <span className="achievement-title">{achievement.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <ul className="timeline-details">
              {item.description.map((desc, i) => (
                <li key={i} className="timeline-detail-item">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
