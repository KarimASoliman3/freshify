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
  const {getCart , setCartData} = useContext(CartContext);

  const session = useSession();
  let router = useRouter();
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
        <HeartIcon className="cursor-pointer" />
      </CardFooter>  
    </>
  );
}
