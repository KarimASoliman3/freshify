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
  // const [userId, setUserId] = useState<string>("");

  async function getCart() {
    if (session.status === 'authenticated') {
      try {
        const response = await fetch("http://localhost:3000/api/get-cart");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CartResponse = await response.json();
        console.log(data);
        setCartData(data);
        if (data?.data?.cartOwner) {
          localStorage.setItem("userId", data?.data.cartOwner);
        }
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
        setCartData(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }
  // Fetch cart data on component mount when the component is rendered for the first time
  const session = useSession();
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
