import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import { fontSans } from '@/config/fonts';
import clsx from "clsx";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Inventory Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased ", fontSans.className)}>
        <Providers>
          {children}
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
    
          />
        </Providers>
      </body>
    </html>
  )
}
