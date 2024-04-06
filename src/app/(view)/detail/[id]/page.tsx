import { Params } from "@/type/ParamsType";
import { ProductDetailType } from "@/type/productDetail";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { BASE_URL } from "@/constants/constants";
import DetailProductConponent from "@/components/DetailProductConponent";

async function getDetail(params: string) {
  const response = await fetch(`${BASE_URL}products/${params}`);
  const data = await response.json();
  return data;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product: ProductDetailType = await fetch(
    `${BASE_URL}products/${id}`
  ).then((res) => res.json());

  return {
    title: product.name,
    description: product.desc,
    openGraph: {
      images: product.image,
    },
  };
}

async function Page({ params }: Props) {
  const product: ProductDetailType = await getDetail(params.id);
  return (
    <div className="">
      <DetailProductConponent {...product} />
    </div>
  );
}

export default Page;
