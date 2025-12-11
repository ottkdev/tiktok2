'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PaymentRecord } from '@/components/Payment'
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Search, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trash2,
  Filter,
  User,
  Mail,
  Phone,
  FileText,
  DollarSign,
  Calendar,
  Settings,
  Save,
  Edit,
  X,
  Building2,
  CreditCard
} from 'lucide-react'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [accountInfo, setAccountInfo] = useState({
    bankName: 'Ziraat Bankası',
    accountName: 'ECOMZ EĞİTİM DANIŞMANLIK LTD. ŞTİ.',
    iban: 'TR12 0001 0000 0000 0000 0000 00',
  })
  const [editingAccountInfo, setEditingAccountInfo] = useState(accountInfo)

  const ADMIN_PASSWORD = 'ecomz2024' // Şifreyi değiştirebilirsiniz

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan ödemeleri al
    loadPayments()
    loadAccountInfo()
  }, [])

  const loadAccountInfo = () => {
    const storedAccountInfo = localStorage.getItem('ecomz_account_info')
    if (storedAccountInfo) {
      try {
        const parsed = JSON.parse(storedAccountInfo)
        setAccountInfo(parsed)
        setEditingAccountInfo(parsed)
      } catch (e) {
        console.error('Hesap bilgileri yüklenirken hata:', e)
      }
    }
  }

  const saveAccountInfo = () => {
    localStorage.setItem('ecomz_account_info', JSON.stringify(editingAccountInfo))
    setAccountInfo(editingAccountInfo)
    setShowAccountSettings(false)
    alert('Hesap bilgileri güncellendi!')
  }

  const loadPayments = () => {
    const storedPayments = localStorage.getItem('ecomz_payments')
    if (storedPayments) {
      const parsed = JSON.parse(storedPayments)
      // Tarihe göre sırala (en yeni önce)
      parsed.sort((a: PaymentRecord, b: PaymentRecord) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setPayments(parsed)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Hatalı şifre!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  const updatePaymentStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const updatedPayments = payments.map(payment => 
      payment.id === id ? { ...payment, status } : payment
    )
    setPayments(updatedPayments)
    localStorage.setItem('ecomz_payments', JSON.stringify(updatedPayments))
  }

  const deletePayment = (id: string) => {
    if (confirm('Bu ödeme kaydını silmek istediğinize emin misiniz?')) {
      const updatedPayments = payments.filter(payment => payment.id !== id)
      setPayments(updatedPayments)
      localStorage.setItem('ecomz_payments', JSON.stringify(updatedPayments))
      if (selectedPayment?.id === id) {
        setSelectedPayment(null)
      }
    }
  }

  const downloadReceipt = (payment: PaymentRecord) => {
    if (payment.receiptFile) {
      const link = document.createElement('a')
      link.href = payment.receiptFile
      link.download = payment.receiptFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.phone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Onaylandı
          </span>
        )
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Reddedildi
          </span>
        )
      default:
        return (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Beklemede
          </span>
        )
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-surface rounded-2xl p-8 border border-dark-card max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-dark-text mb-2">
              <span className="gradient-text">Admin Paneli</span>
            </h1>
            <p className="text-dark-muted">Lütfen şifrenizi girin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 pr-12 text-dark-text focus:outline-none transition-colors"
                placeholder="Şifre"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all glow-effect"
            >
              Giriş Yap
            </motion.button>
          </form>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <div className="pt-24 pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-dark-text mb-2">
                <span className="gradient-text">Admin Paneli</span>
              </h1>
              <p className="text-dark-muted">
                Toplam {payments.length} ödeme kaydı
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAccountSettings(!showAccountSettings)}
                className="px-6 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-all flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Hesap Bilgileri
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
              >
                Çıkış Yap
              </motion.button>
            </div>
          </div>

          {/* Account Settings Panel */}
          {showAccountSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-dark-surface rounded-xl p-6 border border-primary/30 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark-text flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <span className="gradient-text">Ödeme Hesap Bilgileri</span>
                </h2>
                <button
                  onClick={() => {
                    setShowAccountSettings(false)
                    setEditingAccountInfo(accountInfo)
                  }}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-dark-muted" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-dark-muted mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Banka Adı
                  </label>
                  <input
                    type="text"
                    value={editingAccountInfo.bankName}
                    onChange={(e) => setEditingAccountInfo({ ...editingAccountInfo, bankName: e.target.value })}
                    className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors"
                    placeholder="Banka adı"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-muted mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Hesap Adı (Ad Soyad)
                  </label>
                  <input
                    type="text"
                    value={editingAccountInfo.accountName}
                    onChange={(e) => setEditingAccountInfo({ ...editingAccountInfo, accountName: e.target.value })}
                    className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors"
                    placeholder="Hesap adı"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-muted mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    IBAN
                  </label>
                  <input
                    type="text"
                    value={editingAccountInfo.iban}
                    onChange={(e) => setEditingAccountInfo({ ...editingAccountInfo, iban: e.target.value.toUpperCase() })}
                    className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 text-dark-text focus:outline-none transition-colors font-mono"
                    placeholder="TR12 0000 0000 0000 0000 0000 00"
                  />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-dark-muted">
                  <strong className="text-primary">Bilgi:</strong> Bu bilgiler ödeme sayfasında müşterilere gösterilecektir. Değişiklikler kaydedildikten sonra yeni ödemelerde geçerli olacaktır.
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveAccountInfo}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium transition-all glow-effect flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setEditingAccountInfo(accountInfo)
                    setShowAccountSettings(false)
                  }}
                  className="px-6 py-2 bg-dark-card text-dark-text border border-dark-card hover:border-primary/50 rounded-lg font-medium transition-all"
                >
                  İptal
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <div className="bg-dark-surface rounded-xl p-6 border border-dark-card mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="İsim, e-posta veya telefon ile ara..."
                  className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 pl-10 text-dark-text focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full bg-dark-card border border-dark-card focus:border-primary rounded-lg px-4 py-3 pl-10 text-dark-text focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="pending">Beklemede</option>
                  <option value="approved">Onaylandı</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments List */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Payments List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredPayments.length === 0 ? (
                <div className="bg-dark-surface rounded-xl p-12 border border-dark-card text-center">
                  <FileText className="w-16 h-16 text-dark-muted mx-auto mb-4" />
                  <p className="text-dark-muted text-lg">Ödeme kaydı bulunamadı</p>
                </div>
              ) : (
                filteredPayments.map((payment) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-dark-surface rounded-xl p-6 border cursor-pointer transition-all ${
                      selectedPayment?.id === payment.id
                        ? 'border-primary shadow-lg shadow-primary/20'
                        : 'border-dark-card hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-dark-text mb-1 flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          {payment.name}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-dark-muted">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {payment.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {payment.phone}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-dark-card">
                      <div className="flex items-center gap-2 text-dark-muted text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(payment.createdAt).toLocaleDateString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-lg font-bold gradient-text">
                        <DollarSign className="w-5 h-5" />
                        ₺{payment.amount.toLocaleString('tr-TR')}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Payment Details */}
            <div className="lg:col-span-1">
              {selectedPayment ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-surface rounded-xl p-6 border border-dark-card sticky top-24"
                >
                  <h2 className="text-xl font-bold text-dark-text mb-6">
                    <span className="gradient-text">Ödeme Detayları</span>
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Ad Soyad</label>
                      <p className="text-dark-text font-medium">{selectedPayment.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">E-posta</label>
                      <p className="text-dark-text font-medium">{selectedPayment.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Telefon</label>
                      <p className="text-dark-text font-medium">{selectedPayment.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Tutar</label>
                      <p className="text-dark-text font-medium text-lg">₺{selectedPayment.amount.toLocaleString('tr-TR')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Banka</label>
                      <p className="text-dark-text font-medium">{selectedPayment.accountInfo.bankName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">IBAN</label>
                      <p className="text-dark-text font-medium font-mono text-sm">{selectedPayment.accountInfo.iban}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Dekont</label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-dark-muted" />
                        <span className="text-dark-text font-medium text-sm">{selectedPayment.receiptFileName}</span>
                        <button
                          onClick={() => downloadReceipt(selectedPayment)}
                          className="ml-auto p-2 hover:bg-primary/10 rounded-lg transition-colors"
                          title="İndir"
                        >
                          <Download className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Durum</label>
                      {getStatusBadge(selectedPayment.status)}
                    </div>
                    <div>
                      <label className="text-sm text-dark-muted mb-1 block">Tarih</label>
                      <p className="text-dark-text font-medium text-sm">
                        {new Date(selectedPayment.createdAt).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>

                  {/* Receipt Preview */}
                  {selectedPayment.receiptFile && (
                    <div className="mb-6">
                      <label className="text-sm text-dark-muted mb-2 block">Dekont Önizleme</label>
                      <div className="bg-dark-card rounded-lg p-2 border border-dark-card">
                        <img
                          src={selectedPayment.receiptFile}
                          alt="Dekont"
                          className="w-full h-auto rounded-lg max-h-64 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updatePaymentStatus(selectedPayment.id, 'approved')}
                      disabled={selectedPayment.status === 'approved'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedPayment.status === 'approved'
                          ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Onayla
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updatePaymentStatus(selectedPayment.id, 'rejected')}
                      disabled={selectedPayment.status === 'rejected'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedPayment.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                      }`}
                    >
                      <XCircle className="w-4 h-4 inline mr-2" />
                      Reddet
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updatePaymentStatus(selectedPayment.id, 'pending')}
                      disabled={selectedPayment.status === 'pending'}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedPayment.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
                          : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      Beklemede
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => deletePayment(selectedPayment.id)}
                      className="w-full px-4 py-2 rounded-lg font-medium transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Sil
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-dark-surface rounded-xl p-12 border border-dark-card text-center">
                  <Eye className="w-16 h-16 text-dark-muted mx-auto mb-4" />
                  <p className="text-dark-muted">Detayları görmek için bir kayıt seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

