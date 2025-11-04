import Link from "next/link";
import { Kalam } from "next/font/google";
import { ProductI, CategoryI } from "@/interfaces";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { StarHalfIcon } from "lucide-react";
import Star from "@/components/Icons/star";
import AddToCart from "@/components/AddToCart/AddToCart";
import { Button } from "@/components/ui/button";

const kalam = Kalam({
  weight: "700",
  subsets: ["latin"],
});

// Fetch featured products (limit to 8 for home page)
async function getFeaturedProducts() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?limit=8",
      {
        next: { revalidate: 10 * 60 },
      }
    );
    const { data }: { data: ProductI[] } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch categories (limit to 6 for home page)
async function getCategories() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories?limit=6"
    );
    const { data }: { data: CategoryI[] } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch brands (limit to 8 for home page)
async function getBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands?limit=8"
    );
    const { data }: { data: CategoryI[] } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function Home() {
  const [products, categories, brands] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBrands(),
  ]);

  return (
    <>
      {/* Hero Section with Animation */}
      <section className="container mx-auto flex flex-col justify-center items-center text-center min-h-[60vh] px-4 animate-fade-in">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${kalam.className} animate-slide-down`}
        >
          Welcome to Freshify
        </h1>
        <p className="text-lg md:text-xl mb-2 text-stone-600 max-w-2xl animate-fade-in-delay">
          Discover the latest technology, fashion, and more at unbeatable prices
          and explore
        </p>
        <p className="text-lg md:text-xl mb-8 text-stone-600 max-w-2xl animate-fade-in-delay-2">
          our wide range of products enjoy a seamless shopping experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
          <Button
            asChild
            className="bg-black text-white px-8 py-6 rounded-xl shadow-lg hover:bg-stone-900 cursor-pointer text-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-black text-black px-8 py-6 rounded-xl hover:bg-black hover:text-white transition-all duration-300 text-lg hover:scale-105"
          >
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <Link
              href="/categories"
              className="text-black hover:text-stone-600 transition-colors font-semibold underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Card className="py-0 overflow-hidden rounded-lg h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
                  <Link href="/products" className="block">
                    <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                      <Image
                        src={category.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={300}
                        height={300}
                        alt={category.name}
                      />
                    </div>
                    <CardHeader className="pt-3 pb-2 bg-black text-white transition-colors duration-300">
                      <CardTitle className="mb-1 font-medium text-base md:text-lg text-center transition-colors duration-300 group-hover:text-yellow-400">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Brands Section */}
      {brands.length > 0 && (
        <section className="container mx-auto px-4 py-16 ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Our Brands</h2>
            <Link
              href="/brands"
              className="text-black hover:text-stone-600 transition-colors font-semibold underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand._id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Card className="py-0 overflow-hidden rounded-lg h-full transform transition-all duration-300 hover:scale-110 hover:shadow-xl group cursor-pointer bg-white">
                  <Link href="/products" className="block">
                    <div className="relative h-[120px] md:h-[150px] flex items-center justify-center p-4 bg-white">
                      <Image
                        src={brand.image}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        width={200}
                        height={200}
                        alt={brand.name}
                      />
                    </div>
                    <CardHeader className="pt-2 pb-2 bg-black text-white transition-colors duration-300">
                      <CardTitle className="mb-1 font-medium text-sm md:text-base text-center transition-colors duration-300 group-hover:text-yellow-400">
                        {brand.name}
                      </CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {products.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-black hover:text-stone-600 transition-colors font-semibold underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Card className="py-2 overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col">
                  <Link
                    href={"/products/" + product.id}
                    className="group flex-1 flex flex-col"
                  >
                    <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden bg-stone-50">
                      <Image
                        src={product.imageCover}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={300}
                        height={300}
                        alt={product.title}
                      />
                    </div>
                    <CardHeader className="pt-4 pb-2 transition-colors duration-300 flex-1">
                      <CardTitle className="mb-1 transition-colors duration-300 group-hover:text-red-500 line-clamp-2">
                        {product.title.split(" ", 2).join(" ")}
                      </CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                      <CardAction>{product.brand.name}</CardAction>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center pt-0 pb-2">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                          <StarHalfIcon className="text-yellow-500" />
                        </div>
                        <p className="font-semibold ml-1">
                          {product.ratingsAverage}
                        </p>
                      </div>
                      <p className="font-bold text-lg">
                        <span>{product.price}</span> EGP
                      </p>
                    </CardContent>
                  </Link>
                  <AddToCart productId={product.id} />
                </Card>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
