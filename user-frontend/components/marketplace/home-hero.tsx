"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useT } from "@/lib/i18n";

type HomeHeroProps = {
  dishCount?: number;
};

export function HomeHero({ dishCount = 1000 }: HomeHeroProps) {
  const t = useT();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const context = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        y: 18,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, heroRef);
    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative isolate min-h-[min(68vh,32rem)] w-full overflow-hidden rounded-b-[2rem] bg-primary text-white sm:rounded-b-[2.5rem]">
      <Image
        src="/hero/khmer-feast.webp"
        alt="Khmer feast — amok, lok lak, herbs and fresh dishes ready to order"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-[#123e29]/96 via-[#145b39]/78 to-[#145b39]/18"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-[#123e29]/55 via-transparent to-[#123e29]/20"
      />

      <div className="relative mx-auto flex min-h-[min(68vh,32rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-[38rem]">
          <p data-hero-anim className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-md">
            Fresh picks near you
          </p>
          <h1 data-hero-anim className="font-display text-[2.35rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            {t("heroTitle")}
          </h1>
          <p data-hero-anim className="mt-5 max-w-lg text-base leading-7 text-white/85 sm:text-lg">{t("heroText")}</p>
          <div data-hero-anim className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex h-12 items-center rounded-full bg-secondary px-7 text-sm font-bold text-slate-950 transition hover:brightness-95 motion-safe:hover:scale-[1.02]"
            >
              {t("heroCta")}
            </Link>
            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-full border border-white/45 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 motion-safe:hover:scale-[1.02]"
            >
              {t("heroBrowse").replace("{count}", String(dishCount || 1000))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
