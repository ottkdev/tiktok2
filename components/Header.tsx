'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      const handleScroll = () => setIsMobileMenuOpen(false)
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    { name: 'Özellikler', href: '/#ozellikler', isHash: true },
    { name: 'Abonelik', href: '/#abonelik', isHash: true },
    { name: 'Referanslar', href: '/#referanslar', isHash: true },
    { name: 'SSS', href: '/#sss', isHash: true },
    { name: 'Ödeme', href: '/odeme', isHash: false },
  ]

  const handleMenuClick = (href: string, isHash: boolean) => {
    setIsMobileMenuOpen(false)
    
    if (isHash) {
      const hash = href.split('#')[1]
      if (hash) {
        if (pathname === '/') {
          setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 100)
        } else {
          window.location.href = href
        }
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark-surface/98 backdrop-blur-xl shadow-xl border-b border-primary/20' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group z-10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all group-hover:scale-110">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                </motion.div>
              </div>
              <span className="text-2xl font-bold gradient-text hidden sm:block">Ecomz</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                if (item.isHash) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-dark-muted hover:text-primary hover:bg-primary/10 transition-all"
                    >
                      {item.name}
                    </a>
                  )
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-dark-muted hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/odeme"
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
              >
                Katıl
              </Link>
            </div>

            {/* Mobile Menu Button - HER ZAMAN GÖRÜNÜR MOBİLDE */}
            <button
              ref={menuButtonRef}
              aria-label="Menü"
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-primary/10 active:bg-primary/20 transition-colors relative z-[60] bg-dark-surface/50 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              type="button"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-dark-text" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-dark-text" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 right-0 bottom-0 w-72 max-w-[85vw] bg-dark-surface border-l border-primary/20 z-[60] lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    {item.isHash ? (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleMenuClick(item.href, item.isHash)
                        }}
                        className="block px-4 py-3 rounded-lg text-dark-muted hover:text-primary hover:bg-primary/10 transition-all font-medium"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                          pathname === item.href
                            ? 'text-primary bg-primary/10'
                            : 'text-dark-muted hover:text-primary hover:bg-primary/10'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: menuItems.length * 0.03 }}
                  className="pt-6 mt-6 border-t border-dark-card"
                >
                  <Link
                    href="/odeme"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold text-center"
                  >
                    Ecomz'a Katıl!
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
