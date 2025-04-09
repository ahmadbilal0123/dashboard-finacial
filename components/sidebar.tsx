"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  FileBarChart,
  Landmark,
  Lightbulb,
} from "lucide-react"

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   name: "Transactions",
  //   href: "/dashboard/transactions",
  //   icon: CreditCard,
  // },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Receipt,
  },
  {
    name: "Taxes",
    href: "/dashboard/taxes",
    icon: Landmark,
  },
  {
    name: "Bills",
    href: "/dashboard/bills",
    icon: Lightbulb,
  },
  // {
  //   name: "Orders",
  //   href: "/dashboard/orders",
  //   icon: ShoppingCart,
  // },
  // {
  //   name: "Products",
  //   href: "/dashboard/products",
  //   icon: Package,
  // },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart,
  },
  // {
  //   name: "Messages",
  //   href: "/dashboard/messages",
  //   icon: MessageSquare,
  // },
  // {
  //   name: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-purple-600 md:text-white">
      <div className="flex items-center h-16 px-6 border-b border-purple-700">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold">Dashboard</span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-purple-700 text-white"
                : "text-purple-100 hover:bg-purple-700 hover:text-white",
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-purple-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-purple-100 transition-colors hover:bg-purple-700 hover:text-white rounded-md"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}
