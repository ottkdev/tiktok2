'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      quote: "Halihazırda bebek ürünleri sattığım işlek bir mağazam vardı. Kreatif iyileştirmeleri sayesinde satış oranlarımı %200 arttırdım.",
      author: "Hasan Çodur",
      role: "Eva Baby Kurucusu",
      image: "👤",
    },
    {
      quote: "Mouth tape pazarı Türkiye'de yeni bir konseptti. Ecomz'daki trend yakalama ve influencer pazarlama stratejileri ile bu kategoriyi yarattık.",
      author: "Mehmet Ertuğrul",
      role: "UykuBant Kurucusu",
      image: "👤",
    },
    {
      quote: "İlk defa bir şeyler satmıyordum, artık bir marka olmayı hedefliyordum. Düzgün bir yol haritasıyla herkesin bunu yapması mümkün.",
      author: "Melih Altıparmak",
      role: "Futmasaj Kurucusu",
      image: "👤",
    },
    {
      quote: "Mini şarjlı fan pazarı çok rekabetçiydi. Ecomz'daki niş pazar analizi ve sezonsal pazarlama stratejileri ile satışları uçurduk.",
      author: "Bera Ayhan",
      role: "MiniFan Kurucusu",
      image: "👤",
    },
    {
      quote: "Retro gaming pazarında Ecomz'daki nostalji pazarlama ve topluluk oluşturma teknikleri ile sadık bir oyuncu kitlesi yarattık.",
      author: "İrfan Kutbay",
      role: "Techvia Kurucusu",
      image: "👤",
    },
    {
      quote: "CarPlay aftermarket pazarı teknik bilgi gerektiriyordu. Ecomz'daki teknik ürün pazarlama modülleri ile karmaşık ürünümü basit hale getirdim.",
      author: "Yavuz Müftüoğlu",
      role: "Vertzcar Kurucusu",
      image: "👤",
    },
  ]

  return (
    <section id="referanslar" ref={ref} className="py-20 bg-dark-bg relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            <span className="gradient-text">Desteğimizle başarıya ulaşmış sayısız marka.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-dark-surface p-5 md:p-8 rounded-xl md:rounded-2xl border border-dark-card hover:border-primary/50 relative overflow-visible"
              style={{
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-dark-text mb-6 italic text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl"
                  style={{
                    transition: 'transform 0.2s ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-bold text-dark-text">{testimonial.author}</p>
                  <p className="text-dark-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-dark-text border-2 border-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
          >
            Tüm Referansları Gör
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

