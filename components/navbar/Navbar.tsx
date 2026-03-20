'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import GlobalButton from '../buttons/GlobalButton'

const services = [
  { name: 'Culinary', href: '/services/culinary' },
  { name: 'Expansion', href: '/services/expansion' },
  { name: 'Design', href: '/services/design' },
  { name: 'Vendors & Supplies', href: '/services/vendors-supplies' },
  { name: 'Construction', href: '/services/construction' },
  { name: 'Entertainment', href: '/services/entertainment' },
]

const navLinks = [
  { name: 'Overview', href: '/' },
  { name: 'Platform', href: '/growth' },
  { name: 'Business', href: '/about' },
  { name: 'Supply Partners', href: '/services/vendors-supplies' },
  { name: 'Ambassador', href: '/partner' },
  { name: 'Investor', href: '/investors' },
  { name: 'How It Works', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  const isServicesActive = pathname === '/services' || services.some((s) => pathname.startsWith(s.href))

  useEffect(() => {
    if (isServicesActive) setIsServicesOpen(true)
  }, [pathname])

  const closeSidebar = () => setIsSidebarOpen(false)

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} className={`transition-colors duration-200 text-sm font-medium font-effra ${isActive(href) ? 'text-[#FF6B35]' : 'text-[#27272A] hover:text-[#FF6B35]'}`}>
      {children}
    </Link>
  )

  const SidebarLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} onClick={closeSidebar} className={`block py-3 px-4 rounded-lg transition-colors duration-200 text-sm font-medium font-effra ${isActive(href) ? 'text-[#FF6B35] bg-orange-50' : 'text-black hover:bg-gray-100'}`}>
      {children}
    </Link>
  )

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-[4%] flex items-center justify-between h-16 md:h-20">
          <Link href="/" aria-label="Hospyra home" className="outline-0">
            <Image
              src="/assets/svgs/logo.svg"
              alt="Hospyra"
              width={140}
              height={40}
              priority
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          <div className="max-[1200px]:hidden flex items-center gap-4 xl:gap-7">
            {navLinks.slice(0, 2).map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 text-sm font-medium font-effra outline-none transition-colors ${isServicesActive
                  ? 'text-[#FF6B35]'
                  : 'text-[#27272A] hover:text-[#FF6B35]'
                  }`}
              >
                Services <ChevronDown className="h-4.5 w-4.5 text-[#1E50C1] mt-1" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border border-gray-200 min-w-50 mt-2 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link
                    href="/services"
                    className={`cursor-pointer hover:bg-gray-50 px-2 py-1 font-effra ${pathname === '/services'
                      ? 'text-[#FF6B35] bg-orange-50'
                      : 'text-[#27272A] hover:text-[#FF6B35]'
                      }`}
                  >
                    All Services
                  </Link>
                </DropdownMenuItem>

                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link
                      href={service.href}
                      className={`cursor-pointer hover:bg-gray-50 px-2 py-1 font-effra ${pathname === service.href
                        ? 'text-[#FF6B35] bg-orange-50'
                        : 'text-[#27272A] hover:text-[#FF6B35]'
                        }`}
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="max-[1200px]:hidden flex">
            <GlobalButton title='Join Hosperra' font='500' className='px-6 font-effra' borderRadius='8px' height='45px' bgColor='#1E50C1' color='white' />
          </div>

          <button
            onClick={() => setIsSidebarOpen((p) => !p)}
            className="hidden max-[1200px]:block text-[#27272A] hover:text-[#FF6B35] p-2"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 hidden max-[1200px]:block"
          onClick={closeSidebar}
        />
      )}

      <aside className={`fixed top-0 left-0 h-screen w-80 bg-white z-60 transform duration-500 transition-transform hidden max-[1200px]:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-screen flex flex-col border-l border-gray-200">
          <div className="p-6 border-b flex justify-between items-center">
            <Link
              href="/"
              onClick={closeSidebar}
              aria-label="Hospyra home"
              className="outline-0"
            >
              <Image
                src="/assets/svgs/logo.svg"
                alt="Hospyra"
                width={140}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>
            <button onClick={closeSidebar}>
              <X />
            </button>
          </div>

          <nav className="min-h-0 overflow-y-auto py-6 px-6 space-y-1">
            {navLinks.slice(0, 2).map((link) => (
              <SidebarLink key={link.name} href={link.href}>
                {link.name}
              </SidebarLink>
            ))}

            <div className={`py-3 px-4 rounded-lg ${isServicesActive && 'bg-orange-50'}`}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex justify-between w-full text-sm font-medium font-effra ${isServicesActive
                  ? 'text-[#FF6B35]'
                  : 'text-black hover:text-[#FF6B35]'
                  }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                <Link href="/services" onClick={closeSidebar} className="block py-2 pl-4 text-sm font-effra hover:bg-gray-100">
                  All Services
                </Link>

                {services.map((service) => (
                  <Link key={service.href} href={service.href} onClick={closeSidebar} className="block py-2 pl-4 text-sm font-effra hover:bg-gray-100">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <SidebarLink key={link.name} href={link.href}>
                {link.name}
              </SidebarLink>
            ))}
          </nav>

          <div className="p-6 border-t">
            <GlobalButton title='Join Hosperra' font='500' className='px-6 font-effra' borderRadius='8px' height='45px' bgColor='#1E50C1' color='white' />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar;