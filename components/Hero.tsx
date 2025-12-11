'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, DollarSign, Shield, ShoppingBag, Store, Package, ShoppingCart, Box, Tag } from 'lucide-react'

export default function Hero() {
  const floatingIcons = [
    { icon: <Store className="w-6 h-6" />, delay: 0, title: 'Shopify Store' },
    { icon: <Package className="w-6 h-6" />, delay: 0.2, title: 'Ürün Yönetimi' },
    { icon: <ShoppingCart className="w-6 h-6" />, delay: 0.4, title: 'Sepet Sistemi' },
    { icon: <Box className="w-6 h-6" />, delay: 0.6, title: 'Kargo Entegrasyonu' },
    { icon: <Tag className="w-6 h-6" />, delay: 0.8, title: 'Fiyatlandırma' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark-bg pt-24 md:pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Zenginlik için torpil gerekmez.</span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-dark-text"
            >
              Bilgiye önce ulaşan kazanır.
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-dark-text mb-4">
              <span className="gradient-text">Sıfır Sermaye E-Ticaret!</span>
            </h2>
            <p className="text-xl md:text-2xl text-dark-muted mb-6">
              E-ticarete dair tüm araçlar ve dersler tek bir yerde.
              <br />
              Ecomz sınırlı sayıda koltuk içeriyor ve kontenjan doldukça fiyatlar artacak.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/odeme"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2 shadow-lg glow-effect"
            >
              Aramıza Katılın!
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/odeme"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-dark-surface text-dark-text border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/10 transition-all"
            >
              Ecomz'a Katıl!
            </motion.a>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-6 relative z-20"
          >
            {floatingIcons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.15 }}
                className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary border border-primary/30 relative overflow-visible cursor-pointer group"
                style={{
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                }}
                title={item.title}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  className="group-hover:scale-110 transition-transform"
                >
                  {item.icon}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

