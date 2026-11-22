import {
  Bell,
  Bike,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  PackageCheck,
  Search,
  Settings,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: PackageCheck },
  { label: "Restaurants", icon: Store },
  { label: "Customers", icon: Users },
  { label: "Delivery", icon: Bike },
];

const stats = [
  { label: "Gross sales", value: "$48,920", change: "+12.4%", icon: CircleDollarSign },
  { label: "Orders", value: "1,284", change: "+8.1%", icon: PackageCheck },
  { label: "Active partners", value: "186", change: "+4.6%", icon: Store },
  { label: "Customers", value: "12,640", change: "+15.2%", icon: Users },
];

const orders = [
  { id: "#F24-1048", customer: "Sokha Chan", restaurant: "Mekong Kitchen", total: "$18.40", status: "Preparing" },
  { id: "#F24-1047", customer: "Dara Kim", restaurant: "Golden Lotus", total: "$24.10", status: "On the way" },
  { id: "#F24-1046", customer: "Malis Heng", restaurant: "Garden Bowl", total: "$12.80", status: "Delivered" },
  { id: "#F24-1045", customer: "Vuthy San", restaurant: "Noodle Corner", total: "$31.25", status: "Delivered" },
];

export default function AdminHome() {
  return (
    <main className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
        <Link href="/" className="flex items-center gap-3 px-2" aria-label="Food24h admin home">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-primary text-lg font-bold text-white">F</span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-base font-bold">Food24h</p>
            <p className="text-xs text-muted">Operations</p>
          </div>
        </Link>
        <nav className="mt-8 space-y-1" aria-label="Admin navigation">
          {navItems.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex h-11 items-center gap-3 rounded-[14px] px-3 text-sm font-semibold ${
                active ? "bg-primary-soft text-primary" : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {label}
            </a>
          ))}
        </nav>
        <a href="#" className="mt-auto flex h-11 items-center gap-3 rounded-[14px] px-3 text-sm font-semibold text-muted hover:bg-background">
          <Settings className="h-5 w-5" aria-hidden />
          Settings
        </a>
      </aside>

      <section className="w-full lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-border/80 bg-card/95 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="relative hidden w-full max-w-md sm:block">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted" aria-hidden />
            <input
              aria-label="Search operations"
              placeholder="Search orders, partners..."
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" aria-label="Notifications" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-primary-soft">
              <Bell className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" className="flex items-center gap-2 rounded-full border border-border p-1 pr-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">PS</span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-bold">Piseth</span>
                <span className="block text-xs text-muted">Administrator</span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted" aria-hidden />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-7 lg:px-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Marketplace overview</p>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">Good morning, Piseth</h1>
            </div>
            <button type="button" className="h-11 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-[0_10px_22px_-14px_rgba(22,131,75,0.7)]">
              + Create report
            </button>
          </div>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Marketplace statistics">
            {stats.map(({ label, value, change, icon: Icon }) => (
              <article key={label} className="rounded-[1.25rem] border border-border/80 bg-card p-5 shadow-[0_16px_36px_-28px_rgba(24,51,42,0.45)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-muted">{label}</p>
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <p className="mt-5 text-2xl font-bold tracking-tight">{value}</p>
                <p className="mt-2 text-xs font-bold text-success">{change} <span className="font-normal text-muted">from last month</span></p>
              </article>
            ))}
          </section>

          <section className="mt-6 overflow-hidden rounded-[1.25rem] border border-border/80 bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-bold">Recent orders</h2>
                <p className="mt-1 text-xs text-muted">Latest marketplace activity</p>
              </div>
              <button type="button" className="text-sm font-bold text-primary">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-background text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Restaurant</th>
                    <th className="px-5 py-3 font-semibold">Total</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-border/70">
                      <td className="px-5 py-4 font-bold">{order.id}</td>
                      <td className="px-5 py-4">{order.customer}</td>
                      <td className="px-5 py-4 text-muted">{order.restaurant}</td>
                      <td className="px-5 py-4 font-semibold">{order.total}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
