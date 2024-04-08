"use client"
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import { ProductType } from "@/type/product";
import Link from "next/link";
import CardComponent from "@/components/CardComponent";
import CarouselComponent from "@/components/CarouselComponent";
import { BASE_URL } from "@/constants/constants";

export default function Home() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProductList = async () => {
		const response = await fetch(
			`${BASE_URL}products/?page=${currentPage}&page_size=15`
		);
		const data = await response.json();
		setProductList(data.results);
	};

  useEffect(() => {
    fetchProductList();
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className=" bg-slate-50 ">
      <CarouselComponent />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-screen px-[30px] md:[50px] lg:px-[30px] xl:px-[100px] gap-5 xl:gap-8">
        <Suspense fallback={<LoadingComponent />}>
          {productList.map((product: ProductType) => {
            return (
              <Link href={`/detail/${product.id}`} key={product.id}>
                <CardComponent
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  desc ={product.desc}
                  seller={product.seller}
                  category ={product.category}
                  price={product.price}
                  quantity={product.quantity}
                />
              </Link>
            );
          })}
        </Suspense>
      </div>

      <section className="mt-10 ">
        <div className="mt-4 flex justify-center rounded-lg">
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextPage}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r"
          >
            Next Page
          </button>
        </div>
      </section>
    </div>
  );
}
