'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Katıldığımda tam olarak neye erişeceğim?',
      answer: 'Ecomz\'a katıldığınızda Shopify kurulumundan Meta Ads stratejilerine, yapay zeka kullanımından marka kurmaya kadar e-ticaret dünyasının tüm araçlarına ve eğitimlerine erişim sağlarsınız. Ayrıca premium platformlara (ChatGPT Pro, Canva Pro, Dropship.io) ücretsiz erişim ve topluluk desteği de dahildir.',
    },
    {
      question: 'Ecomz\'a katıldığımda paraya ihtiyacım olacak mı?',
      answer: 'Ecomz eğitim platformudur ve sıfır sermaye ile başlamanızı öğretir. Ancak gerçek bir e-ticaret işletmesi kurmak için reklam bütçesi gibi bazı yatırımlar gerekebilir. Ecomz size bu süreçte en verimli yatırım stratejilerini öğretir.',
    },
    {
      question: '18 yaşından küçüksem Ecomz\'a katılabilir miyim?',
      answer: 'Ecomz\'a katılmak için yaş sınırı yoktur. Ancak e-ticaret işletmesi kurmak ve ödeme işlemleri yapmak için yasal yaş sınırları geçerlidir. Eğitim içeriklerine erişim için herhangi bir yaş kısıtlaması bulunmamaktadır.',
    },
    {
      question: 'Paramı ne kadar sürede geri alabilirim?',
      answer: 'Ecomz bir eğitim platformudur ve geri ödeme garantisi sunmaz. Ancak öğrendiğiniz bilgilerle kurduğunuz e-ticaret işletmesinden elde edeceğiniz kazançlar, yatırımınızı kısa sürede geri kazandırabilir. Başarı hikayelerimizde görüldüğü gibi, doğru strateji ve uygulama ile hızlı sonuçlar alınabilir.',
    },
    {
      question: 'E-Ticaret hakkında hiçbir şey bilmiyorum. Sorun yaşar mıyım?',
      answer: 'Kesinlikle hayır! Ecomz tamamen sıfırdan başlayanlar için tasarlanmıştır. Adım adım, detaylı eğitimlerle sıfırdan marka kurmanızı öğretiyoruz. Topluluk desteği ve mentorluk ile hiçbir deneyiminiz olmasa bile başarılı olabilirsiniz.',
    },
    {
      question: 'Ecomz kadınlar için uygun mu?',
      answer: 'Ecomz herkes için tasarlanmıştır ve cinsiyet ayrımı yapmaz. Topluluğumuzda kadın ve erkek girişimciler eşit şekilde başarılı sonuçlar elde etmektedir. E-ticaret, fiziksel güç gerektirmeyen, herkesin eşit şartlarda başarılı olabileceği bir alandır.',
    },
  ]

  return (
    <section id="sss" ref={ref} className="py-20 bg-dark-bg relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text">
              <span className="gradient-text">Sıkça Sorulan Sorular</span>
            </h2>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-dark-card rounded-xl overflow-hidden border border-dark-card hover:border-primary/50 transition-all relative"
              style={{
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.15)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-dark-surface transition-colors"
              >
                <span className="font-semibold text-lg text-dark-text pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-dark-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-dark-muted mb-4">Hala sorularınız mı var?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg transition-all font-medium glow-effect"
          >
            Whatsapp'tan Destek Alın!
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

