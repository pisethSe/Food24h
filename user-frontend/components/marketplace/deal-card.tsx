import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Deal } from "@/types";

export function DealCard({ deal }: { deal: Deal }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="shrink-0 snap-start"
    >
      <Link
        href={`/restaurants/${deal.restaurantSlug}`}
        className="group relative flex h-48 w-[19rem] overflow-hidden rounded-[1.4rem] border border-[#e7e9df] bg-[linear-gradient(135deg,#fffefa,#f1f7ed)] p-5 text-[#18332a] shadow-[0_12px_32px_-26px_rgba(24,51,42,0.5)] transition duration-300 hover:border-primary/30 hover:shadow-[0_20px_38px_-24px_rgba(22,131,75,0.28)] motion-reduce:transition-none sm:w-[21rem]"
      >
      <span className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-primary/10 transition-transform duration-500 motion-safe:group-hover:scale-110 motion-reduce:transition-none" aria-hidden />
      <div className="relative z-10 flex max-w-[60%] flex-col items-start">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-primary">
          Limited-time offer
        </span>
        <p className="mt-3 font-display text-[1.35rem] font-extrabold leading-tight tracking-tight">{deal.title}</p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted">{deal.subtitle}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-white transition group-hover:bg-primary-dark">
          Order now <span aria-hidden>→</span>
        </span>
      </div>
      {deal.imageUrl ? (
        <span className="absolute bottom-2 right-2 grid h-[8.8rem] w-[8.8rem] place-items-center overflow-hidden rounded-[1.25rem] bg-white/90 shadow-[0_10px_26px_-18px_rgba(24,51,42,0.45)] sm:bottom-3 sm:right-3 sm:h-[9.5rem] sm:w-[9.5rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={deal.imageUrl} alt="" className="h-full w-full object-contain transition duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none" />
        </span>
      ) : (
        <span className="absolute bottom-3 right-5 text-7xl" aria-hidden>
          {deal.emoji}
        </span>
      )}
      </Link>
    </motion.div>
  );
}
