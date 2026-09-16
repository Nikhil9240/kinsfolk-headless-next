import Image from "next/image";
import "./events.css";

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  "http://localhost/headless-wp/graphql";

type EventPost = {
  id: string;
  title: string;
  slug: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
  eventDetails?: {
    eventDate?: string | null;
  };
};

async function getEvents(): Promise<EventPost[]> {
  try {
    const query = `
      query GetEvents {
        posts(first: 50) {
          nodes {
            id
            title
            slug
            categories {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            eventDetails {
              eventDate
            }
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Error:", result.errors);
      return [];
    }

    return result?.data?.posts?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

function formatEventDate(date?: string | null) {
  if (!date) return "Date TBA";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date TBA";
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isUpcoming(event: EventPost) {
  return event.categories.nodes.some(
    (category) => category.slug === "upcoming-events"
  );
}

function isPast(event: EventPost) {
  return event.categories.nodes.some(
    (category) => category.slug === "past-events"
  );
}

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter(isUpcoming);
  const pastEvents = events.filter(isPast);

  const heroEvents =
    upcomingEvents.length > 0
      ? upcomingEvents.slice(0, 5)
      : events.slice(0, 5);

  return (
    <main className="eventsPage">

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="heroGlow"></div>

        <div className="container">
          <div className="heroGrid">

            {/* LEFT */}
            <div className="heroContent">

              <div className="eyebrow">
                <span></span>
                EVENTS
              </div>

              <h1>
                Events, Summits
                <br />
                <strong>& CXO Forums</strong>
              </h1>

              <p>
                 Discover our exclusive events, leadership forums, and partner summits featuring insights on BMC Helix, AIOps, Service Management, and enterprise automation. Join us as we collaborate with technology visionaries to drive intelligent and resilient IT operations.
              </p>

              <div className="heroButtons">
                <a href="#featured-events" className="primaryButton">
                  Explore Events
                  <span>→</span>
                </a>

                <a href="#latest-events" className="secondaryButton">
                  View Events
                </a>
              </div>

              <div className="stats">
                <div>
                  <strong>50+</strong>
                  <span>Events Hosted</span>
                </div>

                <div className="statDivider"></div>

                <div>
                  <strong>10K+</strong>
                  <span>Industry Leaders</span>
                </div>

                <div className="statDivider"></div>

                <div>
                  <strong>25+</strong>
                  <span>Cities Worldwide</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="heroVisual">

              <div className="heroSlider">

                {heroEvents.length > 0 ? (
                  heroEvents.map((event, index) => {
                    const image =
                      event.featuredImage?.node?.sourceUrl ||
                      "/images/event-placeholder.jpg";

                    return (
                      <div
                        className={`heroSlide ${
                          index === 0 ? "activeSlide" : ""
                        }`}
                        key={event.id}
                      >

                        <div className="heroImageWrap">
                          <Image
                            src={image}
                            alt={
                              event.featuredImage?.node?.altText ||
                              event.title
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="heroImage"
                          />
                        </div>

                        <div className="nextEventCard">

                          <div className="cardIcon">
                            ▣
                          </div>

                          <small>
                            {index === 0
                              ? "Next Event"
                              : "Featured Event"}
                          </small>

                          <h3>{event.title}</h3>

                          <div className="eventMeta">
                            <span>▣</span>
                            {formatEventDate(
                              event.eventDetails?.eventDate
                            )}
                          </div>

                          <div className="eventMeta">
                            <span>⌖</span>
                            India
                          </div>

                          <div className="arrowCircle">
                            →
                          </div>

                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="heroEmpty">
                    <span>EVENTS</span>
                    <h3>Discover What's Coming Next</h3>
                  </div>
                )}

              </div>

              <div className="heroDots">

                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={dot === 0 ? "activeDot" : ""}
                  ></span>
                ))}

                <b>
                  01 / {String(Math.max(heroEvents.length, 5)).padStart(2, "0")}
                </b>

                <button type="button">‹</button>
                <button type="button">›</button>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY ================= */}

      <section className="categorySection">
        <div className="container">

          <div className="categoryBar">

            {[
              ["▣", "All Events"],
              ["♙", "Summits"],
              ["♧", "Roadshows"],
              ["▣", "Webinars"],
              ["▣", "Partner Events"],
              ["◎", "Awards"],
              ["♧", "Workshops"],
            ].map(([icon, label], index) => (

              <div
                className={`categoryItem ${
                  index === 0 ? "categoryActive" : ""
                }`}
                key={label}
              >
                <span>{icon}</span>
                <strong>{label}</strong>
              </div>

            ))}

          </div>
        </div>
      </section>

      {/* ================= UPCOMING ================= */}

      <section
        className="featuredSection"
        id="featured-events"
      >
        <div className="container">

          <div className="sectionHeading">

            <div>
              <div className="eyebrow">
                <span></span>
                UPCOMING EVENTS
              </div>

              <h2>
                Featured <strong>Events</strong>
              </h2>
            </div>

            <a href="#latest-events">
              View All Events →
            </a>

          </div>

          <div className="featuredGrid">

            {upcomingEvents.length > 0 ? (

              upcomingEvents.map((event) => (

                <article
                  className="eventCard"
                  key={event.id}
                >

                  <div className="cardImage">

                    {event.featuredImage?.node?.sourceUrl && (
                      <Image
                        src={event.featuredImage.node.sourceUrl}
                        alt={
                          event.featuredImage.node.altText ||
                          event.title
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}

                    <div className="dateBadge">
                      <span>▣</span>
                      <strong>
                        {formatEventDate(
                          event.eventDetails?.eventDate
                        )}
                      </strong>
                    </div>

                  </div>

                  <div className="cardBody">

                    <h3>{event.title}</h3>

                    <div className="location">
                      ⌖ India
                    </div>

                    <p>
                      Connect with industry leaders, discover
                      new insights, and explore opportunities
                      for digital transformation.
                    </p>

                    <a
                      href={`/company/events/${event.slug}`}
                    >
                      Know More →
                    </a>

                  </div>

                </article>

              ))

            ) : (

              <div className="noEvents">
                No upcoming events available.
              </div>

            )}

          </div>
        </div>
      </section>

      {/* ================= PAST EVENTS ================= */}

      <section
        className="latestSection"
        id="latest-events"
      >
        <div className="container">

          <div className="sectionHeading">

            <div>

              <div className="eyebrow">
                <span></span>
                PAST EVENTS
              </div>

              <h2>
                Latest <strong>Events</strong>
              </h2>

            </div>

            <div className="filters">

              <div className="searchBox">
                ⌕
                <span>Search events...</span>
              </div>

              <div className="yearFilter">
                All Years ⌄
              </div>

            </div>

          </div>

          <div className="latestList">

            {pastEvents.length > 0 ? (

              pastEvents.map((event) => {

                const eventDate = event.eventDetails?.eventDate
                  ? new Date(event.eventDetails.eventDate)
                  : null;

                return (

                  <article
                    className="latestCard"
                    key={event.id}
                  >

                    <div className="latestDate">

                      <strong>
                        {eventDate
                          ? eventDate.getDate()
                          : "--"}
                      </strong>

                      <span>
                        {eventDate
                          ? eventDate.toLocaleDateString(
                              "en-US",
                              { month: "short" }
                            )
                          : "TBA"}
                      </span>

                    </div>

                    <div className="latestImage">

                      {event.featuredImage?.node?.sourceUrl && (
                        <Image
                          src={
                            event.featuredImage.node.sourceUrl
                          }
                          alt={
                            event.featuredImage.node.altText ||
                            event.title
                          }
                          fill
                          sizes="200px"
                        />
                      )}

                    </div>

                    <div className="latestInfo">

                      <h3>{event.title}</h3>

                      <span>
                        ⌖ India
                      </span>

                    </div>

                    <p>
                      Explore insights, innovation,
                      networking and transformation with
                      industry leaders.
                    </p>

                    <a
                      href={`/company/events/${event.slug}`}
                      aria-label={`View ${event.title}`}
                    >
                      →
                    </a>

                  </article>

                );
              })

            ) : (

              <div className="noEvents">
                No past events available.
              </div>

            )}

          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}

      <section className="newsletter">
        <div className="container">

          <div className="newsletterInner">

            <div>

              <div className="eyebrowLight">
                <span></span>
                STAY AHEAD
              </div>

              <h2>
                Get Latest Event Updates
              </h2>

              <p>
                Be the first to know about upcoming events,
                exclusive invitations and industry insights.
              </p>

            </div>

            <div className="subscribe">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button type="button">
                Subscribe →
              </button>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}