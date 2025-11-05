"use client";
import Loading from "@/app/loading";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatPrice";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import img from "../../../../public/assets/undraw_empty-cart_574u.svg";
import emptyCart from "../../../../public/assets/empty-cart.png";
import Checkout from "@/components/Checkout/Checkout";

export default function Cart() {
  const [removeLoadingId, setRemoveLoadingId] = useState<string | null>(null);
  const [updateCartId, setUpdateCartId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const products = cartData?.data?.products ?? [];

  if (typeof products[0]?.product == "string" || cartData == null) {
    getCart();
  }
  //remove item
  async function removeCartItem(productId: string) {
    setRemoveLoadingId(productId);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM1NzczMTRjZjNlYzA0YWIwNWRkMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5MjY1NDk1LCJleHAiOjE3NjcwNDE0OTV9.VlCCY9JB99CMoTfF2cv2qVlvUQtdruHUV_Z9v-6DZ1I",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.status == "success") {
      toast.success("Product removred successfully");

      setCartData(data);
    }
    setRemoveLoadingId(null);
  }

  // clear cart
  async function clearCart() {
    setIsClearing(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM1NzczMTRjZjNlYzA0YWIwNWRkMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5MjY1NDk1LCJleHAiOjE3NjcwNDE0OTV9.VlCCY9JB99CMoTfF2cv2qVlvUQtdruHUV_Z9v-6DZ1I",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.message == "success") {
      setCartData({
        ...data,
        numOfCartItems: 0,
        data: {
          ...data.data,
          products: [],
          totalCartPrice: 0,
        },
      });
    }
  }

  // update item
  async function updateCartItemCount(productId: string, count: number) {
    if (count == 0) {
      removeCartItem(productId);
    } else {
      setUpdateCartId(productId);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "PUT",
          body: JSON.stringify({ count }),
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM1NzczMTRjZjNlYzA0YWIwNWRkMyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU5MjY1NDk1LCJleHAiOjE3NjcwNDE0OTV9.VlCCY9JB99CMoTfF2cv2qVlvUQtdruHUV_Z9v-6DZ1I",
            "Content-Type": "application/json",
          },
        }
      );
      const data: CartResponse = await response.json();
      if (data.status == "success") {
        toast.success("Product quantity updated successfully");
        setCartData(data);
      }
      setUpdateCartId(null);
    }
  }

  // checkout session

  return (
    <>
      {isLoading || typeof products[0]?.product == "string" ? (
        <Loading />
      ) : (cartData?.numOfCartItems ?? 0) > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          {/* <p className="text-muted-foreground mt-1"> {} item in your cart</p> */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2">
              {cartData?.data.products.map((item) => (
                <div key={item._id} className="rounded-md border mb-3 bg-white">
                  {/* Mobile Card Layout */}
                  <div className="sm:hidden grid grid-cols-2 gap-3 p-3">
                    {/* Column 1: Image, Title, Brand */}
                    <div className="flex flex-col items-center">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover mb-2"
                      />
                      <h2 className="text-sm font-medium text-gray-900 text-center">
                        {item.product.title.split(" ", 3)}
                      </h2>
                      <p className="text-xs text-gray-500 text-center">
                        {item.product.brand.name}
                      </p>
                    </div>
                    {/* Column 2: Price, Quantity, Total */}
                    <div className="flex flex-col justify-around text-center">
                      <div className="flex justify-around">
                        {/* price */}
                        <div>
                          <span className="text-xs text-gray-500">Price</span>
                          <div className="text-sm text-gray-900">
                            {formatCurrency(item.price)}
                          </div>
                        </div>

                        {/* buttons + - */}
                        <div className="mt-2 flex items-center justify-center">
                          <button
                            onClick={() =>
                              updateCartItemCount(
                                item.product.id,
                                item.count - 1
                              )
                            }
                            disabled={item.count == 1}
                            aria-label="decrease"
                            className="size-6 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="mx-2 text-sm text-gray-900">
                            {updateCartId == item.product.id ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              item.count
                            )}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemCount(
                                item.product.id,
                                item.count + 1
                              )
                            }
                            aria-label="increase"
                            className="size-6 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* total */}
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Total</span>
                        <div className="text-sm text-gray-900">
                          {formatCurrency(item.price * item.count)}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button: spans both columns */}
                    <div className="col-span-2 mt-3 flex justify-center">
                      <Button
                        onClick={() => removeCartItem(item.product.id)}
                        disabled={removeLoadingId == item.product.id}
                        aria-label="remove"
                        variant="destructive"
                        className="w-full max-w-[250px] cursor-pointer"
                      >
                        {removeLoadingId === item.product.id && (
                          <Loader2 className="animate-spin" />
                        )}
                        Remove
                      </Button>
                    </div>
                  </div>
                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            {item.product.category.name}
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Price
                          </th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                            Total
                          </th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={80}
                                height={80}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div className="ml-4">
                                <h2 className="text-sm font-medium text-gray-900">
                                  {item.product.title.split(" ", 3)}
                                </h2>
                                <p className="text-sm text-gray-500">
                                  {item.product.brand.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-4 py-4 flex flex-row items-center justify-center mt-5">
                            <button
                              onClick={() =>
                                updateCartItemCount(
                                  item.product.id,
                                  item.count - 1
                                )
                              }
                              disabled={item.count == 1}
                              aria-label="decrease"
                              className="size-7 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg text-lg font-bold"
                            >
                              -
                            </button>
                            <span className="mx-4 text-sm text-gray-900">
                              {updateCartId == item.product.id ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                item.count
                              )}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItemCount(
                                  item.product.id,
                                  item.count + 1
                                )
                              }
                              aria-label="increase"
                              className="size-7 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg font-bold text-sm"
                            >
                              +
                            </button>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {formatCurrency(item.price * item.count)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            <Button
                              onClick={() => removeCartItem(item.product.id)}
                              disabled={removeLoadingId == item.product.id}
                              aria-label="remove"
                              variant="destructive"
                              className="cursor-pointer"
                            >
                              {removeLoadingId === item.product.id && (
                                <Loader2 className="animate-spin" />
                              )}
                              Remove
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* summary cols */}
            <div className="lg:sticky lg:top-20">
              <div className="rounded-md border p-4">
                <h2 className="text-lg font-medium text-gray-900 text-center">
                  Order Summary
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-sm">
                      Subtotal
                    </span>
                    <span>
                      {" "}
                      {formatCurrency(cartData?.data?.totalCartPrice ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-sm">
                      Shipping
                    </span>
                    <span className="text-emerald-600 font-black">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t pt-3 border-b pb-3">
                    <span>Total</span>
                    <span>
                      {formatCurrency(cartData?.data?.totalCartPrice ?? 0)}
                    </span>
                  </div>
                </div>
                {/* check button here */}
                {cartData?.cartId && <Checkout cartId={cartData.cartId} />}

                <Link
                  href={"/products"}
                  className="w-full flex justify-center mt-3"
                >
                  <Button className="cursor-pointer w-full bg-green-700 hover:bg-green-800">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
              <Button
                onClick={clearCart}
                disabled={isClearing}
                variant={"destructive"}
                className="mt-3 w-1/3 cursor-pointer ms-auto flex"
              >
                {isClearing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2Icon className="size-5" />
                )}
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-6 space-y-5">
          <Image src={img} width={400} height={400} alt="empty-cart" />
          <h1 className="text-stone-800 font-bold text-3xl flex gap-x-2.5">
            Your cart is empty
            <Image src={emptyCart} width={40} height={40} alt="empty-cart" />
          </h1>

          <Link href={"/products"} className="w-full flex justify-center">
            <Button className="cursor-pointer w-1/3">Add product</Button>
          </Link>
        </div>
      )}
    </>
  );
}
