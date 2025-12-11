'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShoppingBag, DollarSign, Shield, TrendingUp, Zap, Sparkles, Store, Package, ShoppingCart, Box, Tag } from 'lucide-react'

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: <Store className="w-10 h-10" />,
      title: 'Shopify Mağaza Kurulumu',
      description: "Shopify mağazanızı sıfırdan kurmayı, tema seçimini ve özelleştirmeyi öğretiyoruz.",
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: 'Ürün Yönetimi',
      description: "Ürün ekleme, kategorilendirme, stok yönetimi ve fiyatlandırma stratejileri.",
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: 'Sepet Optimizasyonu',
      description: "Sepet terk oranlarını düşürmek ve satışları artırmak için sepet optimizasyon teknikleri.",
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Box className="w-10 h-10" />,
      title: 'Kargo Entegrasyonu',
      description: "Kargo firmaları entegrasyonu, otomatik kargo hesaplama ve takip sistemleri.",
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Tag className="w-10 h-10" />,
      title: 'Fiyatlandırma Stratejileri',
      description: "Kârlı fiyatlandırma, indirim kampanyaları ve özel fiyat kuralları oluşturma.",
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: 'Para Kazanma Stratejileri',
      description: "Sıfır sermaye ile nasıl para kazanacağınızı ve işletmenizi büyüteceğinizi öğretiyoruz.",
      color: 'from-pink-500 to-rose-500',
    },
  ]

  return (
    <section id="ozellikler" ref={ref} className="py-20 bg-dark-bg relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            <span className="gradient-text">Neden Buradasınız?</span>
          </h2>
          <p className="text-xl text-dark-muted max-w-2xl mx-auto">
            317 satırlık süslü cümlelere gerek yok, size kattığımız değer basit ve nettir.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
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
              className="bg-dark-surface p-4 md:p-6 rounded-xl md:rounded-2xl border border-dark-card hover:border-primary/50 group relative overflow-visible"
              style={{
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}
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
                {feature.icon}
              </div>
              <h3 
                className="text-xl font-bold text-dark-text mb-3 group-hover:text-primary"
                style={{ transition: 'color 0.2s ease' }}
              >
                {feature.title}
              </h3>
              <p className="text-dark-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Success Brands Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-dark-muted mb-8 text-lg">
            Desteğimizle başarıya ulaşmış sayısız marka.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                whileHover={{ opacity: 0.6, scale: 1.1 }}
                className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/20"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

