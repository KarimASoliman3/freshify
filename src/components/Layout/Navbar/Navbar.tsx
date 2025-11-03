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
import { Loader2, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Kalam } from 'next/font/google';
import { useContext } from "react";
import { CartContext } from "@/components/Context/CartContext";
import { signOut, useSession } from "next-auth/react";



const kalam = Kalam({
  weight: '700',
  subsets: ['latin'],
})

export default function Navbar() {

  const {cartData ,isLoading} = useContext(CartContext);
  const session = useSession();
  console.log(session);
  

  return (
    <>
      <nav className="bg-gray-200 shadow py-2 text-3xl font-semibold sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4 md:px-2">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Freshify Logo"
                width={200}
                height={200}
                className="cursor-pointer w-17 h-auto"
                priority={true}
              />
              <span className={`font-bold ml-[-7] mb-1.5 text-2xl ${kalam.className}`}>
                Freshify
              </span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Catergories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/allorders">All Orders</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-0">
                  <UserIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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

              {session.status == 'authenticated' && 
              <Link href={'/cart'} className="relative cursor-pointer"> 
                <ShoppingCartIcon />
                <div className="absolute -top-5 -right-2 p-3 bg-black text-white rounded-full size-5 flex items-center justify-center text-xs">
                  <span>
                  {isLoading ? <Loader2 className="animate-spin"/> : cartData?.numOfCartItems}
                  </span>
                </div>
              </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
