import React, { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import EditProductModal from "../components/EditProductModal";
import { useNavigate } from "react-router-dom";
export function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const role = Cookies.get("role");

 
  const API = import.meta.env.VITE_API_URL;

  console.log(role);

  const [search, setSearch] = useState("");

  const [filteredData, setFilteredData] = useState([]); // Filtered data

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (ele) => {
    setSelectedProduct(ele);
    setEditModalOpen(true);
    console.log(ele);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  console.log(selectedProduct, "selected");

  useEffect(() => {
    getData();
  }, [search, selectedProduct]);

  const getData = async () => {
    try {
      const result = await fetch(`${API}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("acess_token"),
        },
      });

      const data = await result.json();

      setData(data.products);
      setFilteredData(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = async () => {
    console.log(search);
    if (search.length > 0) {
      const result = await fetch(`${API}/products/search?name=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("acess_token"),
        },
      });

      const data = await result.json();
      console.log(data);

      setFilteredData(data.products);
    } else {
      setData(data);
    }
  };

  const handelSubCategory = (e) => {
    console.log(e.target.value);

    if (e.target.value == "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((ele) => {
        return e.target.value == ele.subcategory;
      });

      setFilteredData(filtered);
    }

    console.log(filtered, "filtered products");
  };

  const handelCategory = (e) => {
    console.log(e.target.value);

    if (e.target.value == "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((ele) => {
        return e.target.value == ele.category;
      });

      setFilteredData(filtered);
    }

    console.log(filtered, "filtered products");
  };

  // console.log(data, "hey");

  return (

    <>
    {
      role == undefined ? <h1>Log in first</h1> && navigate("/") : 
    
      <div className="flex gap-4 items-start border border-black">
        <div className="border justify-center gap-4 p-4 w-1/3">
          <div className="flex gap-4">
            <input
              className="flex h-10 w-1/1 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search available products..."
            ></input>

            <button
              type="submit"
              onClick={searchData}
              className="inline-flex w-1/4 items-center justify-center rounded-md bg-black px-1.5 py-1.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Search
            </button>
          </div>

          <select
            onChange={handelCategory}
            className="mt-2 p-2  border-2"
            name=""
            id=""
          >
            <option value="">Selecty by Category</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
          </select>

          <select
            onChange={handelSubCategory}
            className="mt-2 p-2  border-2"
            name=""
            id=""
          >
            <option value="">Selecty by Subcategory</option>
            <option value="smart phone">Smart Phones</option>
            <option value="tablet">Tablet</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {filteredData.map((ele, ind) => (
            <div
              key={ind}
              className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
            >
              <img
                src={
                  ele.image == []
                    ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fxelltechnology.com%2Fproduct%2Fdummy-product-4%2F&psig=AOvVaw1XsOkRl1Ua3Oj3Nq43zk5z&ust=1705084424272000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCLiik9f81YMDFQAAAAAdAAAAABAE"
                    : ele.image
                }
                alt="AirMax Pro"
                className="z-0 h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h1 className="text-lg font-semibold text-white">{ele.name}</h1>
                <h2 className="text-lg font-semibold text-white">
                  {ele.price}
                </h2>

                <p className="mt-2 text-sm text-gray-300">{ele.description}</p>

                <p className="mt-2 text-sm text-gray-300">
                  Category - {ele.category} &rarr; {ele.subcategory}
                </p>

                {role == "merchant" ? (
                  <button
                    onClick={() => handleEditClick(ele)}
                    className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                  >
                    Edit Product
                  </button>
                ) : (
                  <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                    Shop Now &rarr;
                  </button>
                )}

                <EditProductModal
                  isOpen={isEditModalOpen}
                  onClose={handleModalClose}
                  product={selectedProduct}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
}
    </>
  );
}
