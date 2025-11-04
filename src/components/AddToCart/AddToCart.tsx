"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({productId} : {productId:string}) {
  const [isloading, setIsLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const {getCart , setCartData} = useContext(CartContext);

  const session = useSession();
  let router = useRouter();
  
  async function addToWishlist() {
    if (session.status !== 'authenticated') {
      router.push('/login');
      return;
    }
    try {
      setWishLoading(true);
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to add to wishlist');
      setIsWished(true);
      toast.success(data?.message || 'Added to wishlist');
    } catch (e:any) {
      toast.error(e?.message || 'Failed to add to wishlist');
    } finally {
      setWishLoading(false);
    }
  }

  async function removeFromWishlist() {
    if (session.status !== 'authenticated') {
      router.push('/login');
      return;
    }
    try {
      setWishLoading(true);
      const res = await fetch(`/api/wishlist/${productId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to remove from wishlist');
      setIsWished(false);
      toast.success(data?.message || 'Removed from wishlist');
    } catch (e:any) {
      toast.error(e?.message || 'Failed to remove from wishlist');
    } finally {
      setWishLoading(false);
    }
  }
  async function addProductToCart() {
    if (session.status == 'authenticated'){
      setIsLoading(true);
      const data = await addToCartAction(productId);
      if (data.status === "success") {
        setCartData(data);
        toast.success(data.message);
        getCart(); // Refresh cart data
      } else {
        toast.error(data.message || 'Failed to add to cart');
      }
      setIsLoading(false);
      console.log(data);
    }else{
      router.push('/login')
    }
  }
  return (
    <>
      <CardFooter className="gap-2 mb-2">
        <Button disabled={isloading} onClick={addProductToCart} className="grow cursor-pointer">
          {isloading ? <Loader2 className="animate-spin"/> : <ShoppingCart /> } Add to cart
        </Button>
        <button
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={isWished ? removeFromWishlist : addToWishlist}
          disabled={wishLoading}
          className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {wishLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <HeartIcon
              className={isWished ? "text-red-500" : "text-gray-700"}
              fill={isWished ? "currentColor" : "none"}
            />
          )}
        </button>
      </CardFooter>  
    </>
  );
}
