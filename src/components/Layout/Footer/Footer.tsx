import React from "react";
import Image from "next/image";
import logo from "../../../../public/assets/Freshify-white.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Kalam } from "next/font/google";


const kalam = Kalam({
  weight: '400',
  subsets: ['latin'],
})

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              <div className="flex items-center gap-1">
                <Image
                  src={logo}
                  alt="Freshify Logo"
                  width={200}
                  height={200}
                  className="cursor-pointer w-12 h-auto -ml-2.5 "
                  priority={true}
                />
                <span className={`font-bold ml-[-7] mb-1.5 text-2xl ${kalam.className}`}>
                  Freshify
                </span>
              </div>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kids
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 ">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 ">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 ">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          {/* Column 5 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 ">
              Follow Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex gap-3 hover:text-white">
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex gap-3 hover:text-white">
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex gap-3 hover:text-white">
                  <TwitterIcon />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex gap-3 hover:text-white">
                  <LinkedinIcon />
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom section */}
        <div className="mt-8 border-t border-gray-700 py-4 text-center text-sm text-gray-500">
          © 2025 <span className="text-gray-300">Freshify</span>. All rights reserved.
        </div>
      </footer>
    </>
  );
}
