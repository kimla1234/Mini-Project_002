"use client";

import { ACCESS_TOKEN, BASE_URL } from "@/constants/constants";
import axios from "axios";
import { FileInput, Label, Sidebar, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import SidebarComponent from "@/components/SidebarComponent";

export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const router = useRouter();
  const notify = (e: string) => {
    e;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (event.target.files && event.target.files[0]) {
      setImageData(event.target.files[0]);
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Update the FormData object with the selected file

      const formdata = new FormData();
      formdata.append("name", "ISTAD Store Poster");
      formdata.append("image", file, file.name);
    }
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  myHeaders.append(
    "Cookie",
    "csrftoken=gnryQ8sMVh1BNui1Uq3GuytTMmUJIvjQk58iqi5gUU3SbZt1m61R77ylpZaPh0Kj; sessionid=yrc26lgnz6rnke2jti2i4wpxv6i4671k"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", "ISTAD Store Poster");
    if (imageData) {
      formdata.append("image", imageData, imageData.name);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: formdata,
    };

    const imageUrl = await fetch(
      "https://store.istad.co/api/file/product/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result.image)
      .catch((error) => console.error(error));
    try {
      const formData = {
        category: {
          name: productCategory,
          icon: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1693342954-rincon-3-64ee5ca62e001.jpg?crop=1xw:1xh;center,top&resize=980:*",
        },
        name: productName,
        desc: productDescription,
        image: imageUrl,
        price: productPrice,
        quantity: productQuantity,
      };

      console.log(formData);
      fetch(`${BASE_URL}products/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeaders,
      }).catch((error) => {
        console.error("Error:", error);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <main className="grid place-content-center w-screen overflow-y-auto mt-20 p-5">
      <form
        className="flex flex-col gap-4  border p-8 mt-20 w-[800px]"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div>
          <h2 className="text-center text-2xl">Create Product</h2>
          <div className="mb-2 block mt-5">
            <Label htmlFor="name" value="Product Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Buger"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <div className="mb-2 block mt-5">
            <Label htmlFor="price" value="Product Price" />
          </div>
          <TextInput
            id="price"
            type="text"
            placeholder="$500"
            required
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <div className="mb-2 block mt-5">
            <Label htmlFor="quantity" value="Product Quantity" />
          </div>
          <TextInput
            id="quantity"
            type="text"
            placeholder="20"
            required
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />

          <div className="mb-2 block mt-5">
            <Label htmlFor="category" value="Product Category" />
          </div>
          <TextInput
            id="category"
            type="text"
            placeholder="food"
            required
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block mt-5">
            <Label htmlFor="description" value="Product Description" />
          </div>
          <Textarea
            className="h-[150px]"
            id="description"
            placeholder="Our Classic Chicken Jr. Sandwich is loaded with chopped lettuce, creamy mayonnaise, and served to you freshly prepared on a perfectly toasted sesame seed bun"
            required
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <div className="mb-2 block mt-5">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            id="file"
            helperText="Product Images"
            onChange={handleFileChange}
            name="file"
          />
          {imagePreview && (
            <div className="mt-5">
              <Image
                src={imagePreview}
                alt="Preview"
                className="max-w-[150px] rounded-md"
                width={150}
                height={150}
              />
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 text-white p-3 rounded-xl"
          type="submit"
          onClick={() => {
            router.push("/dashboard");
            notify("Product created successfully");
          }}
        >
          Create New
        </button>
      </form>
    </main>
  );
}
