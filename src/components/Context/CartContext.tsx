"use client";
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (data: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: () => {},
});
export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");

  async function getCart() {
    if (session.status == 'authenticated') {
      const response = await fetch("http://localhost:3000/api/get-cart");
      const data: CartResponse = await response.json();
      console.log(data);
      setCartData(data);
      if (data?.data?.cartOwner) {
        localStorage.setItem("userId", data?.data.cartOwner);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }
  // Fetch cart data on component mount when the component is rendered for the first time
  const session = useSession();
  useEffect(() => {
    getCart();
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
