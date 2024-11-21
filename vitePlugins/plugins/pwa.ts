import { VitePWA } from 'vite-plugin-pwa'

export default function createVitePWA () {
  return VitePWA({
    registerType: 'autoUpdate', // 自动更新 Service Worker
    injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'My PWA App',
      start_url: '/',
      short_name: 'MyApp',
      description: 'My awesome Progressive Web App',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/public/icons/apple-startup-1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
        },
        {
          src: '/public/icons/apple-touch-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        },
        {
          src: '/public/icons/apple-touch-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          src: '/public/icons/apple-touch-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: '/public/icons/apple-touch-icon-60x60.png',
          sizes: '60x60',
          type: 'image/png',
        },
        {
          src: '/public/icons/apple-touch-icon-76x76.png',
          sizes: '76x76',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
  })
}