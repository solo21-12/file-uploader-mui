import ResponsiveAppBar from '@/component/navbar'
import './globals.css'
import '../style/home.css'
import "../style/appBar.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'File uploader',
  description: 'created by Dawit using mui library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <ResponsiveAppBar/>
        {children}
        
        </body>
    </html>
  )
}
