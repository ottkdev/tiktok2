'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Upload, 
  CheckCircle, 
  Copy, 
  ArrowRight, 
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  XCircle
} from 'lucide-react'

type PaymentStep = 'start' | 'account' | 'upload' | 'confirmation'

export interface PaymentRecord {
  id: string
  name: string
  email: string
  phone: string
  receiptFileName: string
  receiptFileSize: number
  receiptFileType: string
  receiptFile?: string // base64
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  accountInfo: {
    bankName: string
    accountName: string
    iban: string
  }
}

export default function Payment() {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('start')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [accountInfo, setAccountInfo] = useState({
    bankName: 'Ziraat Bankası',
    accountName: 'ECOMZ EĞİTİM DANIŞMANLIK LTD. ŞTİ.',
    iban: 'TR12 0001 0000 0000 0000 0000 00',
  })

  // localStorage'dan hesap bilgilerini yükle
  useEffect(() => {
    const storedAccountInfo = localStorage.getItem('ecomz_account_info')
    if (storedAccountInfo) {
      try {
        const parsed = JSON.parse(storedAccountInfo)
        setAccountInfo(parsed)
      } catch (e) {
        console.error('Hesap bilgileri yüklenirken hata:', e)
      }
    } else {
      // İlk kurulum - varsayılan değerleri kaydet
      const defaultAccountInfo = {
        bankName: 'Ziraat Bankası',
        accountName: 'ECOMZ EĞİTİM DANIŞMANLIK LTD. ŞTİ.',
        iban: 'TR12 0001 0000 0000 0000 0000 00',
      }
      localStorage.setItem('ecomz_account_info', JSON.stringify(defaultAccountInfo))
      setAccountInfo(defaultAccountInfo)
    }
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadedFile && contactInfo.name && contactInfo.email && contactInfo.phone) {
      // Ödeme kaydını oluştur
      const paymentRecord = {
        id: Date.now().toString(),
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        receiptFileName: uploadedFile.name,
        receiptFileSize: uploadedFile.size,
        receiptFileType: uploadedFile.type,
        amount: 2999,
        status: 'pending', // pending, approved, rejected
        createdAt: new Date().toISOString(),
        accountInfo: {
          bankName: accountInfo.bankName,
          accountName: accountInfo.accountName,
          iban: accountInfo.iban,
        }
      }

      // File'ı base64'e çevir ve kaydet
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        paymentRecord.receiptFile = base64String

        // localStorage'a kaydet
        const existingPayments = JSON.parse(localStorage.getItem('ecomz_payments') || '[]')
        existingPayments.push(paymentRecord)
        localStorage.setItem('ecomz_payments', JSON.stringify(existingPayments))

        setCurrentStep('confirmation')
      }
      reader.readAsDataURL(uploadedFile)
    }
  }

  const isFormValid = uploadedFile && contactInfo.name && contactInfo.email && contactInfo.phone

  return (
    <section className="py-20 bg-dark-bg min-h-screen">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            {['start', 'account', 'upload', 'confirmation'].map((step, index) => {
              const stepNames = ['Başlangıç', 'Hesap Bilgileri', 'Dekont Yükle', 'Onay']
              const stepIndex = ['start', 'account', 'upload', 'confirmation'].indexOf(currentStep)
              const isActive = index <= stepIndex
              const isCurrent = step === currentStep

              return (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-dark-card text-dark-muted'
                      }`}
                    >
                      {isActive && step !== 'start' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs mt-2 ${isCurrent ? 'text-primary' : 'text-dark-muted'}`}>
                      {stepNames[index]}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        isActive ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-dark-card'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Start */}
            {currentStep === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-surface rounded-2xl p-8 border border-dark-card"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CreditCard className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-dark-text mb-4">
                    <span className="gradient-text">Ecomz Üyeliği</span>
                  </h2>
                  <p className="text-dark-muted text-lg mb-6">
                    Sıfır sermaye ile e-ticaret dünyasına adım atın
                  </p>
                  <div className="bg-dark-card rounded-xl p-6 mb-8 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-dark-muted">Üyelik Ücreti</span>
                      <span className="text-3xl font-bold gradient-text">₺2.999</span>
                    </div>
                    <div className="border-t border-dark-card pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-dark-muted text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Sınırsız eğitim içeriği</span>
                      </div>
                      <div className="flex items-center gap-2 text-dark-muted text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Premium araçlara erişim</span>
                      </div>
                      <div className="flex items-center gap-2 text-dark-muted text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Topluluk desteği</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep('account')}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all glow-effect flex items-center gap-2 mx-auto"
                  >
                    Ödemeye Geç
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Account Info */}
            {currentStep === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-surface rounded-2xl p-8 border border-dark-card"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-dark-text mb-2">
                    <span className="gradient-text">Hesap Bilgileri</span>
                  </h2>
                  <p className="text-dark-muted">
                    Aşağıdaki hesap bilgilerine havale/EFT yapabilirsiniz
                  </p>
                </div>

                <div className="bg-dark-card rounded-xl p-6 space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-muted">Banka</span>
                    <span className="text-dark-text font-semibold">{accountInfo.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-muted">Hesap Adı</span>
                    <span className="text-dark-text font-semibold">{accountInfo.accountName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-muted">IBAN</span>
                    <div className="flex items-center gap-2">
                      <span className="text-dark-text font-semibold font-mono">{accountInfo.iban}</span>
                      <button
                        onClick={() => copyToClipboard(accountInfo.iban, 'iban')}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        title="Kopyala"
                      >
                        {copiedField === 'iban' ? (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <Copy className="w-5 h-5 text-dark-muted hover:text-primary" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-dark-muted">
                    <strong className="text-primary">Not:</strong> Ödeme yaptıktan sonra dekont yükleme sayfasına yönlendirileceksiniz.
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep('start')}
                    className="flex-1 bg-dark-card text-dark-text border border-dark-card hover:border-primary/50 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Geri
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep('upload')}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium transition-all glow-effect flex items-center justify-center gap-2"
                  >
                    Ödeme Yaptım
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Upload Receipt */}
            {currentStep === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-surface rounded-2xl p-8 border border-dark-card"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-dark-text mb-2">
                    <span className="gradient-text">Dekont Yükle</span>
                  </h2>
                  <p className="text-dark-muted">
                    Ödeme dekontunuzu yükleyin ve iletişim bilgilerinizi girin
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <label className="block text-dark-text font-medium mb-2">
                      Ödeme Dekontu
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        required
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-dark-card"
                      >
                        {uploadedFile ? (
                          <div className="text-center p-4">
                            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                            <p className="text-dark-text font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-dark-muted mt-1">
                              {(uploadedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="w-12 h-12 text-primary mx-auto mb-2" />
                            <p className="text-dark-text font-medium mb-1">
                              Dekont Yükle
                            </p>
                            <p className="text-sm text-dark-muted">
                              PNG, JPG veya PDF (Max 5MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-dark-text">İletişim Bilgileri</h3>
                    
                    <div>
                      <label className="block text-dark-text font-medium mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors"
                        placeholder="Adınız ve Soyadınız"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-dark-text font-medium mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-posta
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-dark-text font-medium mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors"
                        placeholder="05XX XXX XX XX"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep('account')}
                      className="flex-1 bg-dark-card text-dark-text border border-dark-card hover:border-primary/50 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Geri
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!isFormValid}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        isFormValid
                          ? 'bg-gradient-to-r from-primary to-secondary text-white glow-effect'
                          : 'bg-dark-card text-dark-muted cursor-not-allowed'
                      }`}
                    >
                      Onayla
                      <CheckCircle className="w-5 h-5" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-surface rounded-2xl p-8 border border-dark-card text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                
                <h2 className="text-3xl font-bold text-dark-text mb-4">
                  <span className="gradient-text">Başvurunuz Alındı!</span>
                </h2>
                
                <p className="text-dark-muted mb-8 text-lg">
                  Ödemeniz kontrol edildikten sonra en kısa sürede size dönüş yapacağız.
                </p>

                <div className="bg-dark-card rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-dark-text mb-4">Başvuru Bilgileri</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">Ad Soyad</span>
                      <span className="text-dark-text font-medium">{contactInfo.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">E-posta</span>
                      <span className="text-dark-text font-medium">{contactInfo.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">Telefon</span>
                      <span className="text-dark-text font-medium">{contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-muted">Dekont</span>
                      <span className="text-dark-text font-medium">{uploadedFile?.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-dark-muted">
                    <strong className="text-primary">Bilgi:</strong> Ödemeniz onaylandığında e-posta adresinize erişim bilgileri gönderilecektir.
                  </p>
                </div>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium transition-all glow-effect"
                >
                  Ana Sayfaya Dön
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

