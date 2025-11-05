import { ProductI } from "@/interfaces";
import React from "react";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Star from "@/components/Icons/star";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function ProductDetails({ params }: { params: Params }) {
  //productId is a name of the dynamic segment in the file name [productId]
  const { productId } = await params;
  // productId is a name of the dynamic segment in the file name [productId]
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await response.json();
  console.log(product);

  return (
    <>
      <Card className="grid md:grid-cols-3 items-center space-x-6 p-4">
        <div className="md:col-span-1">
          <ProductSlider images={product.images} altContent={product.title} />
        </div>
        <div className="md:col-span-2 space-y-4 p-4">
          <CardHeader className="px-0">
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className="text-2xl font-bold mb-3 -mt-1">
              {product.title}
            </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 px-0">
            <CardDescription className="font-medium">
              {product.category.name}
            </CardDescription>
            <div className="flex items-center gap-8 mt-2">
              <p className="flex gap-1">
                {" "}
                <Star />{" "}
                <span className="text-yellow-600">
                  {product.ratingsAverage}
                </span>
              </p>
              <p className="text-gray-600">
                {" "}
                Remaining :{" "}
                <span className="font-medium">({product.ratingsQuantity})</span>
              </p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-sm text-gray-800">
                {" "}
                Sold : <span>({product.quantity})</span>
              </p>
              <p className="flex gap-1 items-center">
                {" "}
                <span className="text-xl font-semibold">
                  {product.price} EGP
                </span>
              </p>
            </div>
          </CardContent>
          <AddToCart productId={product.id}/>
          {/* <CardFooter className="gap-2 px-0 md:justify-start mt-3">
            <Button className="grow md:grow-0 md:w-1/2 cursor-pointer">
              <ShoppingCart /> Add to cart
            </Button>
            <HeartIcon className="cursor-pointer" />
          </CardFooter> */}
        </div>
      </Card>
    </>
  );
}
