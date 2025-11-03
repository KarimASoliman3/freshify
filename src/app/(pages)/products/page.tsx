import { ProductI } from "@/interfaces/product";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { StarHalfIcon } from "lucide-react";
import Star from "@/components/Icons/star";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      next: { revalidate: 10 * 60 },
    }
  );
  const { data: products }: { data: ProductI[] } = await response.json();
  // console.log(products);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <Card className="py-2 overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
              <Link href={"/products/" + product.id} className="block group">
                <Image
                  src={product.imageCover}
                  className="w-full transition-none"
                  width={300}
                  height={300}
                  alt={product.title}
                />
                <CardHeader className="pt-4 pb-2 transition-colors duration-300">
                  <CardTitle className="mb-1 transition-colors duration-300 group-hover:text-red-500">
                    {product.title.split(" ", 2)}
                  </CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <CardAction>{product.brand.name}</CardAction>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <StarHalfIcon className="text-yellow-500" />
                    </div>
                    <p className="font-semibold">{product.ratingsAverage}</p>
                  </div>
                  <p className="font-bold">
                    <span>{product.price}</span> EGP
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
