import Link from "next/link";
import { Kalam } from "next/font/google";


const kalam = Kalam({
  weight: '700',
  subsets: ['latin'],
})

export default function Home() {
  return <>
   <div className="container mx-auto flex flex-col justify-center items-center text-center  min-h-[80vh]">
        <h1 className={`text-6xl font-bold mb-6 ${kalam.className}`}>Welcome to Freshify</h1>
        <p className="text-lg mb-2 text-stone-600">
          Discover the latest technology, fashion, and more at unbeatable prices
          and explore
        </p>
        <p className="text-lg mb-8 text-stone-600">
          our wide range of products enjoy a seamless shopping experience.
        </p>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:bg-stone-900 cursor-pointer">
            <Link href="/products">Shop Now</Link>
          </button>
          <button className="border border-black text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition cursor-pointer">
            <Link href="/categories">Browse Categories</Link>
          </button>
        </div>
      </div>
  </>
}
