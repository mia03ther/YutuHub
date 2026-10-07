"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeExperience — motion orchestrator for the homepage film.
 * Wires Lenis smooth scroll + GSAP ScrollTrigger scenes.
 * With prefers-reduced-motion (or without JS) every scene stays
 * fully visible: all "from" states are set by GSAP only.
 */
export function HomeExperience({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    tick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchors through Lenis for cinematic scrolls.
    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (
        event.target as HTMLElement | null
      )?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      if (href === "#top") {
        lenis?.scrollTo(0, { duration: 1.5 });
        return;
      }
      const target =
        href.length > 1 ? document.getElementById(href.slice(1)) : null;
      if (target) {
        lenis?.scrollTo(target, { offset: -56, duration: 1.5 });
      }
    };
    root.addEventListener("click", onAnchorClick);

    const ctx = gsap.context(() => {
      /* ----------------------------------------------------------
         Scene 1 — Hero: chars split & scatter, brand regroups
      ---------------------------------------------------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(
          ".hero-line .char-mask",
          {
            xPercent: () => gsap.utils.random(-140, 140),
            yPercent: () => gsap.utils.random(-50, 50),
            opacity: 0,
            stagger: { each: 0.05, from: "center" },
            ease: "power2.in",
          },
          0,
        )
        .to(".hero-fade", { opacity: 0, y: -26, ease: "none" }, 0)
        .fromTo(
          ".hero-recompose",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 1.1 },
          0.8,
        )
        .to({}, { duration: 0.5 })
        .to(".hero-recompose", {
          opacity: 0,
          y: -60,
          ease: "power2.in",
          duration: 0.7,
        });

      /* ----------------------------------------------------------
         Scene 2 — Manifesto: char-by-char reveal (pinned)
      ---------------------------------------------------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".manifesto-scene",
            start: "top top",
            end: "+=180%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          ".manifesto-ghost",
          { xPercent: 6 },
          { xPercent: -16, ease: "none" },
          0,
        )
        .fromTo(
          gsap.utils.toArray<HTMLElement>(".m-char"),
          { opacity: 0.07, yPercent: 45 },
          { opacity: 1, yPercent: 0, stagger: 0.02, ease: "none" },
          0,
        )
        .fromTo(
          ".manifesto-halo",
          { scale: 0.55, opacity: 0 },
          { scale: 1, opacity: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".manifesto-sub",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: "none" },
          0.6,
        )
        .fromTo(
          ".scene-marquee",
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          0.75,
        )
        .to({}, { duration: 0.4 });

      /* ----------------------------------------------------------
         Scene 3a — Course worlds: keyword collapses into story
      ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".world-course").forEach((article) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: article,
              start: "top 82%",
              end: "top 22%",
              scrub: 0.8,
            },
          })
          .fromTo(
            article.querySelector(".world-name"),
            { opacity: 0.16, letterSpacing: "0.16em", filter: "blur(6px)" },
            {
              opacity: 1,
              letterSpacing: "-0.02em",
              filter: "blur(0px)",
              ease: "none",
            },
            0,
          )
          .fromTo(
            article.querySelectorAll(".world-detail"),
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, stagger: 0.18, ease: "none" },
            0.35,
          );
      });

      /* ----------------------------------------------------------
         Scene 3b — Food poster zoom + horizontal strip drift
      ---------------------------------------------------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".food-poster",
            start: "top 88%",
            end: "center 42%",
            scrub: 0.8,
          },
        })
        .fromTo(
          ".food-giant",
          { scale: 1.18, opacity: 0.15 },
          { scale: 1, opacity: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".food-fade",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.2, ease: "none" },
          0.3,
        );

      gsap.matchMedia().add("(min-width: 1024px)", () => {
        gsap.fromTo(
          ".food-strip",
          { xPercent: 4 },
          {
            xPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: ".food-track",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      /* ----------------------------------------------------------
         Scene 3c — Market entries: layered reveals
      ---------------------------------------------------------- */
      gsap.utils.toArray<HTMLElement>(".market-entry").forEach((entry) => {
        gsap.fromTo(
          entry.querySelectorAll(".market-reveal"),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: "power1.out",
            scrollTrigger: { trigger: entry, start: "top 80%" },
          },
        );
      });

      /* ----------------------------------------------------------
         Scene 4 — Network: kinetic rows drift in opposite directions
      ---------------------------------------------------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".network-stage",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        })
        .fromTo(".network-row-a", { xPercent: 3 }, { xPercent: -16, ease: "none" }, 0)
        .fromTo(".network-row-b", { xPercent: -16 }, { xPercent: 3, ease: "none" }, 0);

      gsap.fromTo(
        ".network-fade",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          ease: "power1.out",
          scrollTrigger: { trigger: ".network-principles", start: "top 82%" },
        },
      );

      /* ----------------------------------------------------------
         Scene 5 — Final CTA: lines rise on the lime stage
      ---------------------------------------------------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".final-cta",
            start: "top 78%",
            end: "top 28%",
            scrub: 0.7,
          },
        })
        .fromTo(
          ".final-line",
          { yPercent: 55, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.16, ease: "none" },
          0,
        )
        .fromTo(
          ".final-fade",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, stagger: 0.15, ease: "none" },
          0.35,
        );
    }, root);

    void document.fonts.ready
      .then(() => ScrollTrigger.refresh())
      .catch(() => {});

    return () => {
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      root.removeEventListener("click", onAnchorClick);
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
