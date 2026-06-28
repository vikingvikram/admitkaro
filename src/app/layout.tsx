import { Nunito, Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'AdmitKaro – India\'s #1 College Discovery Platform',
  description: 'Find and compare 2800+ colleges across India. Compare fees, placements & reviews. Free expert counselling.',
  keywords: 'colleges india, engineering colleges, MBA colleges, MBBS colleges, BBA colleges, college admission',
}

  export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSans.variable}`}>
        {children}
      </body>
    </html>
  )
}