"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ProductI } from "@/interfaces/product";
import { WishlistResponse } from "@/interfaces/wishlist";
import Loading from "@/app/loading";

export default function Wishlist() {
  const [items, setItems] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);

  // 🔹 Fetch wishlist items
  async function loadWishlist() {
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", { cache: "no-store" });
      const json: unknown = await res.json();

      if (!res.ok) {
        const err = json as { message?: string };
        throw new Error(err?.message || "Failed to load wishlist");
      }

      const data = json as WishlistResponse;
      setItems(Array.isArray(data.data) ? data.data : []);
    } catch (e: unknown) {
      console.error("Failed to load wishlist:", e);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Remove an item from the wishlist
  async function removeFromWishlist(productId: string) {
    setPending(true);
    try {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      const data: { message?: string } = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to remove item");

      setItems((prev) =>
        prev.filter((p) => p._id !== productId && p.id !== productId)
      );
    } catch (e: unknown) {
      console.error("Failed to remove from wishlist:", e);
    } finally {
      setPending(false);
    }
  }

  // 🔹 Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <p className="text-gray-600 text-center">No items in wishlist.</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <Card
                key={p._id || p.id}
                className="p-4 flex flex-col items-center text-center gap-4"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24">
                  <Image
                    src={p.imageCover}
                    alt={p.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="w-full">
                  <h3 className="font-medium line-clamp-2">
                    {p.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">${p.price}</p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="destructive"
                  className="w-full cursor-pointer"
                  disabled={pending}
                  onClick={() => removeFromWishlist(p._id || p.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
