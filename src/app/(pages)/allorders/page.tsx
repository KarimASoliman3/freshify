"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Package,
  CreditCard,
  DollarSign,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { OrdersResponse, Order } from "@/interfaces/order";
import Loading from "@/app/loading";

export default function Allorders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<OrdersResponse["metadata"] | null>(
    null
  );
  const [totalResults, setTotalResults] = useState<number>(0);

  async function loadOrders() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const json: unknown = await res.json();
      if (!res.ok) {
        const err = json as { message?: string };
        throw new Error(err?.message || "Failed to load orders");
      }
      const data = json as OrdersResponse;
      setOrders(Array.isArray(data.data) ? data.data : []);
      setMetadata(data.metadata);
      setTotalResults(data.results);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load orders";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadOrders}>Try Again</Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">No orders found.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">All Orders</h1>
            {metadata && (
              <p className="text-sm text-gray-600">
                Page {metadata.currentPage} of {metadata.numberOfPages} (
                {totalResults} total)
              </p>
            )}
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id || order.id} className="p-6">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        Order #{order.id}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        {order.paidAt && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>Paid: {formatDate(order.paidAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.isPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.isDelivered
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Items ({order.cartItems.length})
                    </h3>
                    <div className="space-y-3">
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="relative w-20 h-20 shrink-0">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium line-clamp-2">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Quantity: {item.count} × ${item.price}
                            </p>
                            <p className="text-sm font-semibold mt-1">
                              Subtotal: ${(item.count * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Shipping Address
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.shippingAddress.details}</p>
                        <p>{order.shippingAddress.city}</p>
                        <p>Phone: {order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5" />
                      <h3 className="font-semibold">Order Summary</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>
                          $
                          {(
                            order.totalOrderPrice -
                            order.taxPrice -
                            order.shippingPrice
                          ).toFixed(2)}
                        </span>
                      </div>
                      {order.taxPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span>${order.taxPrice.toFixed(2)}</span>
                        </div>
                      )}
                      {order.shippingPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>${order.shippingPrice.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span>${order.totalOrderPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">
                      {order.paymentMethodType}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
