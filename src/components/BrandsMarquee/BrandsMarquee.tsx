// "use client";

// import Link from "next/link";
// import { CategoryI } from "@/interfaces";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Marquee from "react-fast-marquee";

// interface BrandsMarqueeProps {
//   brands: CategoryI[];
// }

// export default function BrandsMarquee({ brands }: BrandsMarqueeProps) {
//   // Duplicate brands for seamless loop
//   const duplicatedBrands = [...brands, ...brands];

//   return (
//     <Marquee
//       speed={60}
//       gradient={true}
//       gradientColor={[250, 250, 249]} // stone-50 background color
//       gradientWidth={100}
//       pauseOnHover={true}
//       direction="right"
//       className="py-4"
//     >
//       {duplicatedBrands.map((brand, index) => (
//         <div
//           key={`${brand._id}-${index}`}
//           className="mx-3 w-[150px] sm:w-[170px] md:w-[180px]"
//         >
//           <Card className="py-0 overflow-hidden rounded-lg h-full transform transition-all duration-300 hover:scale-110 hover:shadow-xl group cursor-pointer bg-white">
//             <Link href="/products" className="block">
//               <div className="relative h-[120px] md:h-[150px] flex items-center justify-center p-4 bg-white">
//                 <Image
//                   src={brand.image}
//                   className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                   width={200}
//                   height={200}
//                   alt={brand.name}
//                 />
//               </div>
//               <CardHeader className="pt-2 pb-2 bg-black text-white transition-colors duration-300">
//                 <CardTitle className="mb-1 font-medium text-sm md:text-base text-center transition-colors duration-300 group-hover:text-yellow-400">
//                   {brand.name}
//                 </CardTitle>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//       ))}
//     </Marquee>
//   );
// }
