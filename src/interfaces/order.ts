import { ProductI } from "./product";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: OrderUser;
  cartItems: CartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface OrdersResponse {
  results: number;
  metadata: OrdersMetadata;
  data: Order[];
}

