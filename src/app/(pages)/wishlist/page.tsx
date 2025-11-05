"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {Trash2 } from "lucide-react";
import { ProductI } from "@/interfaces/product";
import { WishlistResponse } from "@/interfaces/wishlist";
import Loading from "@/app/loading";

export default function Wishlist() {
  const [items, setItems] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  const [productIdToAdd, setProductIdToAdd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function loadWishlist() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wishlist", { cache: "no-store" });
      const json: unknown = await res.json();
      if (!res.ok) {
        const err = json as { message?: string };
        throw new Error(err?.message || "Failed to load");
      }
      const data = json as WishlistResponse;
      setItems(Array.isArray(data.data) ? data.data : []);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to load wishlist";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function addToWishlist(productId: string) {
    if (!productId) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data: { message?: string } = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to add");
      await loadWishlist();
      setProductIdToAdd("");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to add to wishlist";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  async function removeFromWishlist(productId: string) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      const data: { message?: string } = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to remove");
      setItems((prev) =>
        prev.filter((p) => p._id !== productId && p.id !== productId)
      );
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to remove from wishlist";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* {error ? <p className="text-destructive mb-4">{error}</p> : null}

      <div className="flex  gap-2 mb-6">
        <Input
          placeholder="Enter productId to add"
          value={productIdToAdd}
          onChange={(e) => setProductIdToAdd(e.target.value)}
        />
        <Button
          disabled={pending}
          onClick={() => addToWishlist(productIdToAdd)}
        >
          {pending ? <Loader2 className="animate-spin mr-2" /> : null}
          Add
        </Button>
      </div> */}

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <Card key={p._id || p.id} className="p-4 flex gap-4 items-center">
                <div className="w-17 h-17 relative shrink-0">
                  <Image
                    src={p.imageCover}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className=" flex justify-between gap-2 items-center w-full">
                  <h3 className="font-medium line-clamp-2">
                    {p.title.split(" ", 2)}
                  </h3>
                  <p className="text-sm text-gray-600">${p.price}</p>
                </div>
                <div className="w-full">
                  <Button
                    variant="destructive"
                    className="mt-2 w-full cursor-pointer"
                    disabled={pending}
                    onClick={() => removeFromWishlist(p._id || p.id)}
                  >
                    <Trash2 className="mr-0.5 h-4 w-4" /> Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
