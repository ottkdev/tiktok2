import Header from '@/components/Header'
import Payment from '@/components/Payment'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Ödeme - Ecomz',
  description: 'Ecomz üyeliği için ödeme sayfası',
}

export default function OdemePage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <Payment />
      <Footer />
    </main>
  )
}

