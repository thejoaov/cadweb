"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthProvider"

const routes = [
  { href: "/admin", label: "Dashboard", adminOnly: false },
  { href: "/admin/products", label: "Products", adminOnly: true },
  { href: "/admin/orders", label: "Orders", adminOnly: false },
  { href: "/admin/users", label: "Users", adminOnly: true },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {routes.map((route) => {
            if (route.adminOnly && user?.role !== "ADMIN") return null
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn("block px-4 py-2 hover:bg-gray-700", pathname === route.href && "bg-gray-700")}
                >
                  {route.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4">
        <Button onClick={logout} variant="secondary" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

