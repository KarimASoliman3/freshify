"use client"
import React, { useContext, useRef, useState} from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CartContext } from "../Context/CartContext";

export default function Checkout({ cartId }: { cartId: string }) {
  let { cartData, getCart, setCartData } = useContext(CartContext);
  const [isLoadingVisa, setIsLoadingVisa] = useState<boolean>(false)
  const [isLoadingCash, setIsLoadingCash] = useState<boolean>(false)


  let detailsInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);

  // online payment visa
  async function checkoutSessionVisa() {
    const shippingAddress = {
      details : detailsInput.current?.value,
      phone : phoneInput.current?.value,
      city : cityInput.current?.value,
      
    };
  
    setIsLoadingVisa(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM1NzczMTRjZjNlYzA0YWIwNWRkMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5MjY1NDk1LCJleHAiOjE3NjcwNDE0OTV9.VlCCY9JB99CMoTfF2cv2qVlvUQtdruHUV_Z9v-6DZ1I",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status == 'success'){
      location.href = data.session.url
    }
    setIsLoadingVisa(false);
  }
  // payment 
  const router =useRouter();

  async function checkoutSessionCash() {
    setIsLoadingCash(true)
    const shippingAddress = {
      details : detailsInput.current?.value,
      phone : phoneInput.current?.value,
      city : cityInput.current?.value,
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/` + cartId,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM1NzczMTRjZjNlYzA0YWIwNWRkMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5MjY1NDk1LCJleHAiOjE3NjcwNDE0OTV9.VlCCY9JB99CMoTfF2cv2qVlvUQtdruHUV_Z9v-6DZ1I",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status == 'success'){
       setCartData({
        ...data,
        numOfCartItems: 0,
        data: {
          ...data.data,
          products: [],
          totalCartPrice: 0,
        },
      });
      router.push('allorders')
    }
    setIsLoadingCash(false)
    console.log(data);
  }


  return (
    <>
      {/* <Button className="cursor-pointer w-full ">Proceed Checkout</Button> */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="cursor-pointer w-full mt-3">Proceed Checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-bold">Add Shipping Address</DialogTitle>
              <DialogDescription>
                please add shipping address
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Input ref={cityInput} id="city"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="details">Details</Label>
                <Input ref={detailsInput} id="details"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input ref={phoneInput} id="phone"/>
              </div>
              
            </div>
            <DialogFooter className="flex flex-row flex-wrap-reverse sm:justify-between">
              <DialogClose asChild>
                <Button variant={'destructive'} className="cursor-pointer">Cancel</Button>
              </DialogClose>
              <div className="space-x-3 flex flex-wrap gap-y-2">
                <Button disabled={isLoadingVisa} onClick={checkoutSessionVisa} className="cursor-pointer" type="submit">
                  {isLoadingVisa && <Loader2 className="animate-spin"/>} Visa
                </Button>
                <Button disabled={isLoadingCash} onClick={checkoutSessionCash} type="submit" className="cursor-pointer bg-green-700 hover:bg-green-800">
                  {isLoadingCash && <Loader2 className="animate-spin"/>}  Cash
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
