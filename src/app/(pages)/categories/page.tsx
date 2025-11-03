import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategoryI } from "@/interfaces";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      // next: { revalidate: 10 * 60 },
    }
  );
  const { data: categories }: { data: CategoryI[] } = await response.json();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-5">
        {categories.map((categorie) => (
          <div key={categorie._id}>
            <Card className="py-0 overflow-hidden rounded-lg h-[295px] transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
              <Link href={"/products/"} className="block group">
                <Image
                  src={categorie.image}
                  className="w-full object-cover h-[250px] transition-none"
                  width={300}
                  height={300}
                  alt=""
                />
                <CardHeader className="pt-2 pb-0 bg-black text-white transition-colors duration-300">
                  <CardTitle className="mb-1 font-medium text-xl text-center transition-colors duration-300 group-hover:text-yellow-400">
                    {categorie.name}
                  </CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
