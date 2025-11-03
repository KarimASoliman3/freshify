'use client'
import React, { ReactNode } from 'react'
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/components/Context/CartContext";
import {SessionProvider} from 'next-auth/react'

export default function Provider({children} : {children : ReactNode}) {
  return <>
    <SessionProvider>
          <CartContextProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Toaster />
              <div className="container mx-auto py-4">{children}</div>
            </main>
            <Footer />
          </div>
        </CartContextProvider>
        </SessionProvider>
  </>
}
