"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  slug: string;
  eventDetails?: {
    eventDate?: string | null;
  } | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

type EventsHeroProps = {
  events: EventItem[];
};

function formatEventDate(date?: string | null) {
  if (!date) {
    return {
      day: "--",
      month: "---",
      year: "----",
    };
  }

  const parsedDate = new Date(date);

  return {
    day: parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
    }),
    month: parsedDate
      .toLocaleDateString("en-GB", {
        month: "short",
      })
      .toUpperCase(),
    year: parsedDate.toLocaleDateString("en-GB", {
      year: "numeric",
    }),
  };
}

export default function EventsHero({ events }: EventsHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const heroEvents = events.slice(0, 5);

  useEffect(() => {
    if (heroEvents.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === heroEvents.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroEvents.length]);

  if (!heroEvents.length) {
    return (
      <section className="events-hero">
        <div className="events-hero__container">
          <div className="events-hero__content">
            <span className="events-hero__eyebrow">
              <span />
              EVENTS
            </span>

            <h1>
              Events, Summits
              <br />
              <span>& CXO Forums</span>
            </h1>

            <p>
              Join us at exclusive events, leadership forums, and partner
              summits where industry visionaries come together to share ideas,
              explore opportunities, and drive digital transformation.
            </p>

            <div className="events-hero__buttons">
              <a href="#upcoming-events" className="events-btn events-btn--primary">
                Explore Events
                <span>→</span>
              </a>

              <a href="/contact-us" className="events-btn events-btn--outline">
                Partner With Us
              </a>
            </div>

            <div className="events-hero__stats">
              <div>
                <strong>50+</strong>
                <span>Events Hosted</span>
              </div>

              <div>
                <strong>10K+</strong>
                <span>Industry Leaders</span>
              </div>

              <div>
                <strong>25+</strong>
                <span>Cities Worldwide</span>
              </div>
            </div>
          </div>

          <div className="events-hero__visual">
            <div className="events-hero__empty">
              Upcoming events will appear here.
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activeEvent = heroEvents[activeIndex];
  const activeDate = formatEventDate(
    activeEvent.eventDetails?.eventDate
  );

  const nextIndex =
    activeIndex === heroEvents.length - 1 ? 0 : activeIndex + 1;

  const nextEvent = heroEvents[nextIndex];

  const nextDate = formatEventDate(
    nextEvent?.eventDetails?.eventDate
  );

  return (
    <section className="events-hero">
      <div className="events-hero__container">

        {/* LEFT CONTENT */}
        <div className="events-hero__content">

          <span className="events-hero__eyebrow">
            <span />
            EVENTS
          </span>

          <h1>
            Connect. Learn. Build
            <br />
            <span>A Smarter Tomorrow.</span>
          </h1>

          <p>
            Join us at exclusive events, leadership forums, and partner
            summits where industry visionaries come together to share ideas,
            explore opportunities, and drive digital transformation.
          </p>

          <div className="events-hero__buttons">

            <a
              href="#upcoming-events"
              className="events-btn events-btn--primary"
            >
              Explore Events
              <span>→</span>
            </a>

            <a
              href="/contact-us"
              className="events-btn events-btn--outline"
            >
              Partner With Us
            </a>

          </div>

          <div className="events-hero__stats">

            <div>
              <strong>50+</strong>
              <span>Events Hosted</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Industry Leaders</span>
            </div>

            <div>
              <strong>25+</strong>
              <span>Cities Worldwide</span>
            </div>

          </div>

        </div>

        {/* RIGHT SLIDER */}
        <div className="events-hero__visual">

          <div className="events-hero__dots-bg" />

          <button
            type="button"
            className="events-hero__arrow events-hero__arrow--prev"
            onClick={() =>
              setActiveIndex(
                activeIndex === 0
                  ? heroEvents.length - 1
                  : activeIndex - 1
              )
            }
            aria-label="Previous event"
          >
            ←
          </button>

          <div className="events-hero__cards">

            {/* BACK CARD */}
            {nextEvent && (
              <div className="event-hero-card event-hero-card--back">

                <div className="event-hero-card__image">
                  {nextEvent.featuredImage?.node?.sourceUrl && (
                    <Image
                      src={nextEvent.featuredImage.node.sourceUrl}
                      alt={
                        nextEvent.featuredImage.node.altText ||
                        nextEvent.title
                      }
                      fill
                      sizes="300px"
                    />
                  )}
                </div>

                <div className="event-hero-card__body">

                  <div className="event-hero-card__date">
                    <strong>{nextDate.day}</strong>

                    <span>
                      {nextDate.month}
                      <small>{nextDate.year}</small>
                    </span>
                  </div>

                  <h3>{nextEvent.title}</h3>

                </div>

              </div>
            )}

            {/* MAIN CARD */}
            <article className="event-hero-card event-hero-card--active">

              <div className="event-hero-card__image">

                {activeEvent.featuredImage?.node?.sourceUrl && (
                  <Image
                    src={activeEvent.featuredImage.node.sourceUrl}
                    alt={
                      activeEvent.featuredImage.node.altText ||
                      activeEvent.title
                    }
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 520px"
                  />
                )}

                <span className="event-hero-card__badge">
                  UPCOMING EVENT
                </span>

              </div>

              <div className="event-hero-card__body">

                <div className="event-hero-card__date">

                  <strong>{activeDate.day}</strong>

                  <span>
                    {activeDate.month}
                    <small>{activeDate.year}</small>
                  </span>

                </div>

                <h2>{activeEvent.title}</h2>

                <a href={`/events/${activeEvent.slug}`}>
                  View Event
                  <span>→</span>
                </a>

              </div>

            </article>

          </div>

          <button
            type="button"
            className="events-hero__arrow events-hero__arrow--next"
            onClick={() =>
              setActiveIndex(
                activeIndex === heroEvents.length - 1
                  ? 0
                  : activeIndex + 1
              )
            }
            aria-label="Next event"
          >
            →
          </button>

          <div className="events-hero__pagination">

            {heroEvents.map((event, index) => (
              <button
                key={event.id}
                type="button"
                className={
                  index === activeIndex
                    ? "is-active"
                    : ""
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}