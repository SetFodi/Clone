export const metadata = {
  title: 'Proxied — 4G/5G Mobile Proxy Marketplace',
  description:
    'Proxied connects buyers with sellers directly, offering 4G/5G mobile proxies worldwide at true market prices.',
}

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
