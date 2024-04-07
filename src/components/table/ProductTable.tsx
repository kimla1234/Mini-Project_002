"use client";
import { ProductType } from "@/type/product";

import {
  Button,
  Dropdown,
  FileInput,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import LoadingComponent from "../LoadingComponent";
import { ACCESS_TOKEN, BASE_URL } from "@/constants/constants";

export default function ProductTable() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  const [productId, setProductId] = useState(Number);
  const [editProductDetails, setEditProductDetails] =
    useState<ProductType | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [imageData, setImageData] = useState<File | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(10); // Default page size
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  // handle modal ----------------------------------------------------------------

  const handleView = (product: ProductType) => {
    setProductDetails(product);
    setOpenModal(true);
  };

  const handleDelete = (product: ProductType) => {
    setProductId(product.id);
    setOpenDeleteModal(true);
  };

  const handleEdit = (product: ProductType) => {
    setEditProductDetails(product);
    setOpenEditModal(true);
  };

  //---------------------------------------------------------------------------------

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const columnsData: TableColumn<ProductType>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Seller",
      selector: (row) => row.seller,
    },
    {
      name: "Image",
      selector: (row): any => (
        <div className="max-w-sm w-full h-full overflow-hidden">
          <img
            src={row.image}
            alt={row.name}
            className="xl:w-16 xl:h-16  md:w-12 md:h-12  w-10 h-10 object-cover"
          />
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row): any => (
        <div className="gap-2 flex">
          <button
            className="text-white bg-green-400 p-3 rounded-lg font-semibold hover:bg-green-500"
            onClick={() => handleView(row)}
          >
            View
          </button>
          <button
            className={`text-white p-3 rounded-lg font-semibold  ${
              row.seller === "kimla chhoeurn"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-300 line-through text-black cursor-not-allowed"
            }`}
            onClick={() => {
              if (row.seller === "kimla chhoeurn") handleEdit(row);
            }}
          >
            Edit
          </button>
          <button
            className={`text-white p-3 rounded-lg font-semibold  ${
              row.seller === "kimla chhoeurn"
                ? "bg-red-500 hover:bg-red-700"
                : "bg-gray-300 line-through text-black cursor-not-allowed"
            }`}
            onClick={() => {
              if (row.seller === "kimla chhoeurn") handleDelete(row);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  function deleteProduct(id: Number) {
    fetch(`${BASE_URL}products/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  const handleUpdate = async () => {
    console.log(productDetails);
    const productId = editProductDetails?.id;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    myHeaders.append(
      "Cookie",
      "csrftoken=gnryQ8sMVh1BNui1Uq3GuytTMmUJIvjQk58iqi5gUU3SbZt1m61R77ylpZaPh0Kj; sessionid=yrc26lgnz6rnke2jti2i4wpxv6i4671k"
    );

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
    const formData = {
      id: editProductDetails?.id,
      category: {
        name: editProductDetails?.category,
        icon: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1693342954-rincon-3-64ee5ca62e001.jpg?crop=1xw:1xh;center,top&resize=980:*",
      },
      name: editProductDetails?.name,
      desc: editProductDetails?.desc,
      image: imageUrl && productDetails?.image,
      price: editProductDetails?.price,
      quantity: editProductDetails?.quantity,
    };

    try {
      const response = await fetch(`${BASE_URL}products/${productId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedProductList = productList.map((product) => {
          if (product.id === productId) {
            return formData;
          }
          return product;
        });
        setProductList(updatedProductList as ProductType[]);
        setOpenEditModal(false);
      } else {
        console.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  async function fetchData() {
    const data = await fetch(
      `${BASE_URL}products/?page=${currentPage}&page_size=${pageSize}`
    );
    const response = await data.json();
    setTotalPages(response.total);
    setFilteredData(response.name);
    setProductList(response.results);
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (!search) {
      setFilteredData(data);
      return;
    }

    const result = productList.filter((item) => {
      // Assuming 'username' is the correct property; adjust as necessary
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredData(data);
  }, [search, productList]);

  return (
    <div className=" w-auto h-auto  ">
      <DataTable
        fixedHeader={true}
        fixedHeaderScrollHeight="710px"
        columns={columnsData}
        data={productList}
        progressComponent={<LoadingComponent />}
        progressPending={isLoading}
        subHeaderComponent={
          <div className="flex justify-start w-full p-2">
            <TextInput
              className="xl:w-[50%] w-[100%]"
              type="text"
              placeholder="Type to search..."
              value={search}
              id="disabledInput1"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
        subHeader

      />

      <section className="bg-white p-2 rounded-b-md">
        <div className="mt-4 flex justify-end ">
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
          )}
          <p className="flex items-center xl:mx-5 mx-2 xl:text-lg md:text-lg text-sm">
            Row per page : {currentPage} of{" "}
            {totalPages && Math.ceil(totalPages / pageSize)}
          </p>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mx-2 xl:p-2  border border-gray-400 rounded xl:text-lg md:text-sm text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <button
            onClick={handleNextPage}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r xl:text-lg md:text-lg text-sm"
          >
            Next Page
          </button>
        </div>
      </section>

      <Modal size="xl" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-2xl"> Product Details</p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-10">
              <img
                src={productDetails?.image}
                alt={productDetails?.name || "UNKNOWN"}
                width={250}
                height={250}
                className="rounded-lg "
              />
              <div>
                <p className="text-lg font-bold">{productDetails?.name}</p>
                <p>${productDetails?.price}</p>
                <p>Instock : {productDetails?.quantity}</p>
                <p>Seller : {productDetails?.seller}</p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {productDetails?.desc || "No description available"}
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* delete modal */}
      <Modal
        show={openDeleteModal}
        size="xl"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenDeleteModal(false);
                  deleteProduct(productId);
                  window.location.reload();
                  toast.success("Product Deleted");
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit product modal */}
      <Modal
        show={openEditModal}
        size="xl"
        onClose={() => setOpenEditModal(false)}
        popup
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <form method="POST">
            <div>
              <h2 className="text-center text-2xl">Update Product</h2>
              <div className="mb-2 block mt-5">
                <Label htmlFor="name" value="Product Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                value={editProductDetails?.name || ""}
                onChange={(e) =>
                  setEditProductDetails((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                    id: prevState?.id || 0,
                    seller: prevState?.seller || "",
                    category: String(prevState?.category) || "",
                    desc: prevState?.desc || "",
                    image: prevState?.image || "",
                    price: prevState?.price || "",
                    quantity: prevState?.quantity || 0,
                  }))
                }
              />
              <div className="mb-2 block mt-5">
                <Label htmlFor="price" value="Product Price" />
              </div>
              <TextInput
                id="price"
                type="text"
                placeholder="$500"
                required
                value={editProductDetails?.price || ""}
                onChange={(e) =>
                  setEditProductDetails((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                    id: prevState?.id || 0,
                    seller: prevState?.seller || "",
                    category: prevState?.category.toString() || "",
                    name: prevState?.name || "",
                    desc: prevState?.desc || "",
                    image: prevState?.image || "",
                    quantity: prevState?.quantity || 0,
                  }))
                }
              />

              <div className="mb-2 block mt-5">
                <Label htmlFor="category" value="Product category" />
              </div>
              <TextInput
                id="quantity"
                type="text"
                placeholder="20"
                required
                value={editProductDetails?.category || 0}
                onChange={(e) =>
                  setEditProductDetails((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                    id: prevState?.id || 0,
                    seller: prevState?.seller || "",
                    quantity: prevState?.quantity || 0,
                    name: prevState?.name || "",
                    desc: prevState?.desc || "",
                    image: prevState?.image || "",
                    price: prevState?.price || "",
                  }))
                }
              />
            </div>
            <div>
              <div className="mb-2 block mt-5">
                <Label htmlFor="description" value="Product Description" />
              </div>
              <Textarea
                className="h-[150px]"
                id="description"
                placeholder="Air Jordan 1 is a sneaker designed by Peter Moore, Michael Jordan's first signature shoe. It was created for the 1984-85 season and later banned by the NBA for breaking uniform regulations."
                required
                value={editProductDetails?.desc || ""}
                onChange={(e) =>
                  setEditProductDetails((prevState) => ({
                    ...prevState,
                    desc: e.target.value,
                    id: prevState?.id || 0,
                    seller: prevState?.seller || "",
                    category: prevState?.category.toString() || "",
                    name: prevState?.name || "",
                    image: prevState?.image || "",
                    price: prevState?.price || "",
                    quantity: prevState?.quantity || 0,
                  }))
                }
              />
            </div>
            <div className="mb-2 block mt-5">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              helperText="Product Images"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImageData(file || null);
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const imageDataUrl = event.target?.result;
                    setEditProductDetails((prevState) => ({
                      ...prevState,
                      image: imageDataUrl as string,
                      id: prevState?.id || 0,
                      name: prevState?.name || "",
                      seller: prevState?.seller || "",
                      category: prevState?.category.toString() || "",
                      price: prevState?.price || "",
                      quantity: prevState?.quantity || 0,
                      desc: prevState?.desc || "",
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              name="file"
            />
            <div className="mb-2 block mt-5">
              <Label htmlFor="image" value="Product Image" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            color="primary"
            onClick={() => {
              handleUpdate();
              router.push("/dashboard");
              setOpenEditModal(false);
              toast.success("Product Updated", {
                closeOnClick: true,
              });
            }}
          >
            Update
          </button>
          <button color="gray" onClick={() => setOpenEditModal(false)}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
