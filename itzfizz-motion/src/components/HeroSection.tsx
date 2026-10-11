
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "@/components/BlurText";

const stats = [
  { value: 58, suffix: "%", label: "CREATIVE THINKING" },
  { value: 23, suffix: "%", label: "DIGITAL EXPERIENCES" },
  { value: 27, suffix: "%", label: "BOLD IDEAS" },
  { value: 40, suffix: "%", label: "BETTER EXECUTION" },
];

function CarIllustration() {
  return (
    <svg
      viewBox="0 0 180 90"
      className="car-illustration"
      role="img"
      aria-label="Stylized sports car"
      fill="none"
    >
      <defs>
        <linearGradient id="carBody" x1="25" y1="20" x2="145" y2="75">
          <stop offset="0%" stopColor="#efffa2" />
          <stop offset="42%" stopColor="#d7ff45" />
          <stop offset="100%" stopColor="#8aa923" />
        </linearGradient>
        <linearGradient id="carGlass" x1="65" y1="25" x2="120" y2="50">
          <stop offset="0%" stopColor="#d9e7e5" />
          <stop offset="100%" stopColor="#536365" />
        </linearGradient>
      </defs>

      <ellipse cx="91" cy="74" rx="69" ry="8" fill="#000" opacity=".5" />

      <path
        d="M29 39 L22 31 L44 31 L48 39"
        fill="#d7ff45"
        stroke="#a9ce30"
        strokeWidth="2"
      />

      <path
        d="M17 59 L21 47 Q24 41 39 39 L57 35 L75 17 Q79 13 87 13 L118 16 Q127 17 133 26 L145 43 L159 48 Q166 51 166 59 L163 66 L17 66 Z"
        fill="url(#carBody)"
        stroke="#eaff9a"
        strokeWidth="1.5"
      />

      <path
        d="M64 35 L79 19 Q82 17 88 17 L99 18 L99 35 Z"
        fill="url(#carGlass)"
        stroke="#f4ffce"
        strokeWidth="1"
      />

      <path
        d="M104 18 L117 20 Q123 21 128 29 L133 35 L104 35 Z"
        fill="url(#carGlass)"
        stroke="#f4ffce"
        strokeWidth="1"
      />

      <path d="M21 53 L44 51 L57 54 L44 57 L23 57" fill="#b7dc36" />
      <path d="M143 45 L156 49 L159 54 L145 53 Z" fill="#f7fff0" />
      <path d="M27 62 L155 62" stroke="#77951e" strokeWidth="2" />

      {[49, 133].map((x) => (
        <g key={x}>
          <circle cx={x} cy="64" r="16" fill="#111313" />
          <circle
            cx={x}
            cy="64"
            r="10"
            fill="#727978"
            stroke="#d4d9d4"
            strokeWidth="2"
          />
          <circle cx={x} cy="64" r="4" fill="#202422" />
          <path
            d={`M${x} 55 L${x} 73 M${x - 9} 64 L${x + 9} 64 M${x - 6} 58 L${x + 6} 70 M${x + 6} 58 L${x - 6} 70`}
            stroke="#c8d0cb"
            strokeWidth="1.5"
          />
        </g>
      ))}

      <path d="M157 51 L164 54 L163 58 L155 57" fill="#fffbdc" />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [blurKey, setBlurKey] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const car = section.querySelector<HTMLElement>(".car");
      const track = section.querySelector<HTMLElement>(".road-track");
      const trail = section.querySelector<HTMLElement>(".road-trail");

      if (!car || !track || !trail) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Only the road and car are visible at the beginning.
      gsap.set(
        [
          ".topbar",
          ".hero-kicker",
          ".hero-heading",
          ".hero-copy",
          ".hero-index",
          ".road-meta",
          ".road-caption",
          ".stats-section",
          ".hero-footer",
        ],
        {
          autoAlpha: 0,
          y: 20,
        },
      );

      gsap.set(trail, { width: 0 });
      gsap.set(".stat-number", { textContent: "0" });

      if (reducedMotion) {
        gsap.set(
          [
            ".topbar",
            ".hero-kicker",
            ".hero-heading",
            ".hero-copy",
            ".hero-index",
            ".road-meta",
            ".road-caption",
            ".stats-section",
            ".hero-footer",
          ],
          { autoAlpha: 1, y: 0 },
        );

        section.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
          el.textContent = el.dataset.target ?? "0";
        });

        gsap.set(trail, { width: "100%" });
        return;
      }

      // Phase 1: the car crosses the road.
      // Phase 2: the rest of the hero reveals only after the car arrives.
      const motion = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.2, 1800)}`,
          pin: ".hero-stage",
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      motion.to(
        car,
        {
          x: () => Math.max(0, track.clientWidth - car.offsetWidth),
          duration: 1,
          ease: "none",
        },
        0,
      );

      // The car trail follows the car as the timeline is scrubbed.
      motion.eventCallback("onUpdate", () => {
        const carCenter = car.offsetLeft + car.offsetWidth / 2;
        const carX = Number(gsap.getProperty(car, "x")) || 0;

        gsap.set(trail, {
          width: Math.max(0, carCenter + carX),
        });
      });

      // All reveal animations begin after the car's travel phase.
      const revealStart = 1.08;

      motion.to(
        ".topbar",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
        },
        revealStart,
      );

      motion.to(
        ".hero-kicker",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          onStart: () => setBlurKey((value) => value + 1),
        },
        revealStart + 0.12,
      );

      motion.to(
        ".hero-heading",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        revealStart + 0.25,
      );

      motion.to(
        [".hero-copy", ".hero-index"],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
        },
        revealStart + 0.48,
      );

      motion.to(
        [".road-meta", ".road-caption"],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.08,
          ease: "power2.out",
        },
        revealStart + 0.5,
      );

      motion.to(
        ".stats-section",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        revealStart + 0.65,
      );

      motion.to(
        ".stat-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.12,
          ease: "power2.out",
        },
        revealStart + 0.72,
      );

      motion.to(
        ".hero-footer",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        revealStart + 1.05,
      );

      // The counters are also controlled by the scroll timeline.
      section.querySelectorAll<HTMLElement>(".stat-number").forEach((el, i) => {
        const target = Number(el.dataset.target);
        if (!Number.isFinite(target)) return;

        const counter = { value: 0 };

        motion.to(
          counter,
          {
            value: target,
            duration: 0.32,
            ease: "none",
            snap: { value: 1 },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          },
          revealStart + 0.78 + i * 0.09,
        );
      });

      // Reset the React Bits animation when scrolling all the way back.
      motion.eventCallback("onReverseComplete", () => {
        setBlurKey((value) => value + 1);
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="hero-section">
      <section className="hero-stage">
        <nav className="topbar" aria-label="Main navigation">
          <a className="wordmark" href="#" aria-label="Itzfizz home">
            ITZ<span>FIZZ</span>
            <sup>®</sup>
          </a>

          <span className="topbar-note">INDEPENDENT CREATIVE STUDIO</span>

          <a className="topbar-link" href="#about">
            OUR APPROACH <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-dot" />
            <BlurText
              key={blurKey}
              text="CREATIVITY IN MOTION"
              delay={70}
              animateBy="words"
              direction="top"
              className="blur-kicker"
            />
          </div>

          <h1 className="hero-heading">
            WELCOME
            <br />
            <span>ITZFIZZ</span>
            <span className="heading-period">.</span>
          </h1>

          <div className="hero-support">
            <p className="hero-copy">
              We turn ambitious ideas into digital experiences that refuse to
              stand still.
            </p>

            <div className="hero-index">
              <span>SCROLL TO DRIVE</span>
              <span className="scroll-arrow" aria-hidden="true">
                ↓
              </span>
            </div>
          </div>
        </div>

        <div className="road-section" aria-label="Car travelling along a road">
          <div className="road-meta">
            <span>IDEAS → IMPACT</span>
            <span>SCROLL-CONTROLLED MOTION / 001</span>
          </div>

          <div className="road-track">
            <div className="road-surface" />
            <div className="road-center-line" />
            <div className="road-trail" />

            <div className="car">
              <CarIllustration />
            </div>

            <div className="road-end-marker" aria-hidden="true">
              <span />
            </div>
          </div>

          <div className="road-caption">
            <span>START WITH AN IDEA</span>
            <span>MAKE IT MOVE</span>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-intro">
            <span className="section-label">THE CREATIVE ENGINE</span>
            <span className="stats-caption">FOUR WAYS WE MOVE FORWARD</span>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <article className="stat-card" key={stat.label}>
                <div className="stat-topline">
                  <span>0{index + 1}</span>
                  <span className="stat-cross" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <p className="stat-value">
                  <span className="stat-number" data-target={stat.value}>
                    0
                  </span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </p>

                <p className="stat-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <footer className="hero-footer">
          <span>GOOD IDEAS DON’T SIT STILL.</span>
          <span>ITZFIZZ® — DIGITAL EXPERIENCES</span>
          <span>01 / 04</span>
        </footer>
      </section>

      <section id="about" className="after-section">
        <span className="section-label">AFTER THE FIRST IMPRESSION</span>
        <h2>
          THE JOURNEY
          <br />
          <span>CONTINUES.</span>
        </h2>
        <p>
          A great digital experience is more than a destination. It is every
          interaction that gets you there.
        </p>
      </section>
    </main>
  );
}
