import Link from "next/link";
import type { Deal } from "@/types";

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/restaurants/${deal.restaurantSlug}`}
      className="relative flex h-40 w-72 shrink-0 snap-start overflow-hidden rounded-[1.25rem] p-5 text-white shadow-[0_12px_32px_-24px_rgba(24,51,42,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(24,51,42,0.5)] sm:w-80"
      style={{ background: `linear-gradient(120deg, ${deal.tint[0]}, ${deal.tint[1]})` }}
    >
      <div className="relative z-10 max-w-[58%]">
        <p className="font-display text-2xl font-extrabold leading-tight">{deal.title}</p>
        <p className="mt-2 text-sm text-white/90">{deal.subtitle}</p>
        <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
          Order now →
        </span>
      </div>
      <span className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-white/15" aria-hidden />
      {deal.imageUrl ? (
        <span className="absolute bottom-2 right-2 h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white/40 sm:h-32 sm:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={deal.imageUrl} alt="" className="h-full w-full object-contain p-1.5" />
        </span>
      ) : (
        <span className="absolute bottom-3 right-5 text-7xl drop-shadow-xl" aria-hidden>
          {deal.emoji}
        </span>
      )}
      <span className="absolute bottom-2 left-5 text-[10px] text-white/70">T&C apply</span>
    </Link>
  );
}
