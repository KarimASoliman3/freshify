"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "../../../../public/assets/FreshifyBlack-removebg-preview.png";
import { Loader2, ShoppingCartIcon, UserIcon, Menu, X } from "lucide-react";
import { Kalam } from 'next/font/google';
import { useContext, useState } from "react";
import { CartContext } from "@/components/Context/CartContext";
import { signOut, useSession } from "next-auth/react";



const kalam = Kalam({
  weight: '700',
  subsets: ['latin'],
})

export default function Navbar() {

  const {cartData ,isLoading} = useContext(CartContext);
  const session = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/allorders", label: "All Orders" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-200 shadow-md py-1 md:py-1.5 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Image
                src={logo}
                alt="Freshify Logo"
                width={200}
                height={200}
                className="cursor-pointer w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                priority={true}
              />
              <span className={`font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl ${kalam.className}`}>
                Freshify
              </span>
            </Link>

            {/* Desktop Navigation Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-2 xl:space-x-4">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={link.href}
                        className="px-3 py-2 text-sm xl:text-base font-medium hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-0 p-2 hover:bg-gray-300 rounded-full transition-colors">
                  <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.status == 'authenticated' ? <>
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={()=> signOut({
                      callbackUrl : '/'
                    })}>Logout</DropdownMenuItem>
                  </> : <>
                    <Link href="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                     <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                  }
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart Icon */}
              {session.status == 'authenticated' && 
              <Link href={'/cart'} className="relative cursor-pointer p-2 hover:bg-gray-300 rounded-full transition-colors"> 
                <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-semibold">
                  {isLoading ? (
                    <Loader2 className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <span className="text-[10px] sm:text-xs">
                      {cartData?.numOfCartItems || 0}
                    </span>
                  )}
                </div>
              </Link>
              }

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-300 rounded-full transition-colors outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 sm:px-6 py-4 space-y-2 border-t border-gray-300 bg-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
