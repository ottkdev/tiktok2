# Ecomz Clone

Bu proje, [Ecomz](https://www.ecomz.co/) web sitesinin birebir kopyasıdır. Next.js, React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Smooth animasyonlar (Framer Motion)
- ✅ Mobil uyumlu navigasyon
- ✅ Interaktif FAQ bölümü
- ✅ Testimonials/Referanslar bölümü
- ✅ Tüm içerikler Türkçe

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Proje Yapısı

```
├── app/
│   ├── layout.tsx      # Ana layout
│   ├── page.tsx        # Ana sayfa
│   └── globals.css     # Global stiller
├── components/
│   ├── Header.tsx      # Header/Navigation
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Özellikler bölümü
│   ├── Education.tsx   # Eğitim içerikleri
│   ├── Testimonials.tsx # Referanslar
│   ├── FAQ.tsx         # Sık Sorulan Sorular
│   └── Footer.tsx      # Footer
└── public/             # Statik dosyalar
```

## Build

Production build için:

```bash
npm run build
npm start
```

## Lisans

Bu proje eğitim amaçlı oluşturulmuştur.

