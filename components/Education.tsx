'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, ShoppingBag, Dumbbell, Network, Gift, Palette, Store, Package } from 'lucide-react'

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const educationItems = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Yapay Zeka',
      description: 'Çağımızın en büyük nimeti olan Yapay Zeka\'yı kullanmayı öğrenin. Bu sayede kimseye muhtaç kalmaz ve bütün işlerinizi 10 kat daha verimli yapabilirsiniz.',
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'E-Ticaret',
      description: 'Marka kurmayı, viral reklamlar oluşturmayı ve satış yapmayı öğrenin. Bu sayede uyurken bile para kazanın ve özgürlüğe kavuşun.',
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Fitness',
      description: 'Zihnini ve bedenini aynı anda geliştir. Sağlıklı ve fit bir vücuda sahip olun ve çalışmalarınızı bir üst düzeye çıkarır.',
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: 'Network',
      description: 'Sizinle beraber sürekli olarak çalışacak ve faydalı insanlarla tanışın. Kazananların arasında olmak, seni de kazanan yapar.',
    },
  ]

  const freeMemberships = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: '+3000$ Üyelikler',
      description: 'Premium araçlara ekstra ücret ödemeyin. Ecomz üyeliğiyle ChatGPT Pro, Canva Pro, Dropship.io, gibi platformlara erişim sağlayın.',
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Sağlık Ve Fitness',
      description: 'Zihinsel başarı fiziksel ve mental sağlıkla başlar. Fitness, beslenme ve yaşam dengesine dair özel içeriklerle verimini artır, tempoyu koru.',
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: 'Shopify Temaları',
      description: 'Sıfırdan tema oluşturma ve özelleştirme teknikleri ile profesyonel mağazalar kurun.',
    },
  ]

  return (
    <section id="abonelik" ref={ref} className="py-20 bg-dark-bg relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ecomz Size Ne Katıyor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            <span className="gradient-text">Ecomz Size Ne Katıyor?</span>
          </h2>
          <p className="text-xl text-dark-muted max-w-2xl mx-auto">
            Belki 4 yılını üniversiteye verdin ve hâlâ iş arıyorsun. Biz 4 haftada kendi markanı kurmanı öğretiyoruz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
          {educationItems.map((item, index) => (
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
              className="bg-dark-card p-4 md:p-6 rounded-lg md:rounded-xl border border-dark-card hover:border-primary/50 group relative overflow-visible"
              style={{
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div 
                className="mb-4 text-primary"
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
                {item.icon}
              </div>
              <h3 
                className="text-xl font-bold text-dark-text mb-3 group-hover:text-primary"
                style={{ transition: 'color 0.2s ease' }}
              >
                {item.title}
              </h3>
              <p className="text-dark-muted text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bedava Üyelikler */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
            <span className="gradient-text">Bedava Üyelikler</span>
          </h2>
          <p className="text-xl text-dark-muted">
            Ecomz'a Özel Bedava Üyelikler.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {freeMemberships.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="bg-dark-card p-5 md:p-8 rounded-xl md:rounded-2xl border border-dark-card hover:border-primary/50 group relative overflow-visible"
              style={{
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div 
                className="mb-4 text-primary"
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
                {item.icon}
              </div>
              <h3 
                className="text-2xl font-bold text-dark-text mb-3 group-hover:text-primary"
                style={{ transition: 'color 0.2s ease' }}
              >
                {item.title}
              </h3>
              <p className="text-dark-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/odeme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all glow-effect"
          >
            Aramıza Katılın!
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

