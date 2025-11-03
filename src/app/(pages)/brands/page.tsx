import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: CategoryI[] } = await response.json();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-5">
        {brands.map((brand) => (
          <div key={brand._id}>
            <Card className="py-0 overflow-hidden rounded-lg h-[295px] transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
              <Link href={"/products/"} className="block group">
                <Image
                  src={brand.image}
                  className="w-full object-contain h-[250px] transition-none"
                  width={200}
                  height={200}
                  alt=""
                />
                <CardHeader className="pt-2 pb-0 bg-black text-white transition-colors duration-300">
                  <CardTitle className="mb-1 font-medium text-xl text-center transition-colors duration-300 group-hover:text-yellow-400">
                    {brand.name}
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
