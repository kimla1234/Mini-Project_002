import React from "react";
import { ProductType } from "@/type/product";

export default function CardComponent({
  name,
  image,
  price,
  quantity,
}: ProductType) {
  return (
    <div className="w-full flex items-center justify-center xl:h-[350px]  md:h-[300px]  rounded-lg  bg-gray-200 dark:bg-gray-800">
      <div className="max-w-sm w-full h-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
        <div>
          <img
            className="object-cover h-64 md:h-36 xl:h-48 w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 transform duration-300"
            src={image}
            alt="product image"
          />
        </div>

        <div className="p-6">
          <div className="flex items-baseline">
            <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
              New
            </span>
            <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
              In stock {quantity}
            </div>
          </div>
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
            {name}
          </h4>
          <div className="mt-1">
            <span>${price}</span>
            <span className="text-gray-600 text-sm">/ wk</span>
          </div>
          <div className="mt-2 flex items-center">
            <div className="text-teal-600 font-semibold">
              <div>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                <div></div>
                <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
