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
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 pt-8 sm:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid System: 1 col mobile, 2 col small, 3 col medium, 5 col large - All columns equal width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
            {/* Column 1 - Logo and Categories */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                <div className="flex items-center gap-1">
                  <Image
                    src={logo}
                    alt="Freshify Logo"
                    width={200}
                    height={200}
                    className="cursor-pointer w-10 sm:w-12 h-auto -ml-2.5"
                    priority={true}
                  />
                  <span
                    className={`font-bold ml-[-7] mb-1.5 text-xl sm:text-2xl ${kalam.className}`}
                  >
                    Freshify
                  </span>
                </div>
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kids
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 - Customer Service */}
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Legal */}
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-4">
                Legal
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5 - Follow Us */}
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-4">
                Follow Us
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 sm:gap-3 hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 sm:gap-3 hover:text-white transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 sm:gap-3 hover:text-white transition-colors"
                  >
                    <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 sm:gap-3 hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Linkedin</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section - Copyright */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
            <div className="text-center text-xs sm:text-sm text-gray-500 px-4">
              © 2025 <span className="text-gray-300 font-medium">Freshify</span>
              . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
