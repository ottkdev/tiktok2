'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-bg border-t border-dark-card py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ecomz</h3>
            <p className="text-dark-muted mb-4">
              Hayat, seçimlerinizin bir sonucudur.
            </p>
            <a
              href="mailto:destek@ecomz.co"
              className="text-dark-muted hover:text-primary transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              destek@ecomz.co
            </a>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h4 className="font-semibold mb-4 text-dark-text">Hızlı Linkler</h4>
            <a
              href="#ozellikler"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Özellikler
            </a>
            <a
              href="#abonelik"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Abonelik
            </a>
            <a
              href="#referanslar"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Referanslar
            </a>
            <a
              href="#sss"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Sık Sorulanlar
            </a>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            <h4 className="font-semibold mb-4 text-dark-text">Yasal</h4>
            <a
              href="#gizlilik"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#odeme-sorunlari"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Ödeme Sorunları
            </a>
            <a
              href="#kullanim-kosullari"
              className="block text-dark-muted hover:text-primary transition-colors"
            >
              Kullanım Koşulları
            </a>
          </motion.div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-dark-card pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex gap-4"
            >
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-dark-muted hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-dark-muted hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-dark-muted hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-dark-muted text-sm"
            >
              Ecomz © {currentYear}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}

