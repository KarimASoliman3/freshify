// "use client";

// import Link from "next/link";
// import { CategoryI } from "@/interfaces";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Marquee from "react-fast-marquee";

// interface CategoriesMarqueeProps {
//   categories: CategoryI[];
// }

// export default function CategoriesMarquee({ categories }: CategoriesMarqueeProps) {
//   // Duplicate categories for seamless loop
//   const duplicatedCategories = [...categories, ...categories];

//   return (
//     <Marquee
//       speed={50}
//       gradient={true}
//       gradientColor={[255, 255, 255]}
//       gradientWidth={100}
//       pauseOnHover={true}
//       className="py-4"
//     >
//       {duplicatedCategories.map((category, index) => (
//         <div
//           key={`${category._id}-${index}`}
//           className="mx-3 w-[200px] sm:w-[220px] md:w-[240px]"
//         >
//           <Card className="py-0 overflow-hidden rounded-lg h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
//             <Link href="/products" className="block">
//               <div className="relative h-[180px] md:h-[200px] overflow-hidden">
//                 <Image
//                   src={category.image}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   width={300}
//                   height={300}
//                   alt={category.name}
//                 />
//               </div>
//               <CardHeader className="pt-3 pb-2 bg-black text-white transition-colors duration-300">
//                 <CardTitle className="mb-1 font-medium text-base md:text-lg text-center transition-colors duration-300 group-hover:text-yellow-400">
//                   {category.name}
//                 </CardTitle>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//       ))}
//     </Marquee>
//   );
// }

