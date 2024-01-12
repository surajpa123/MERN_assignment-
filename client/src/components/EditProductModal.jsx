import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const EditProductModal = ({ isOpen, onClose, product }) => {

    const API = import.meta.env.VITE_API_URL;

  const [editedProduct, setEditedProduct] = useState({...product})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(()=>{
    setEditedProduct({...product});
    setRes("")

  },[isOpen,product])

  const [res,setRes] =  useState('')                                                                               


  const handleSaveChanges = async () => {
    // Add logic to save changes to the backend or update state

    try {

        console.log(editedProduct._id)

        const result = await fetch(
            `${API}/products/edit/${editedProduct._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                authorization: Cookies.get("acess_token"),
              },
              body: JSON.stringify(editedProduct),
            }
          );
    
          const data = await result.json();

          console.log(data);
    
        //   setData(data.products);

          if(data.sucess ==  true){

            setRes(data.message)

          }
        
      
  


  
  
      console.log('Saving changes:', product);
        
    } catch (error) {

        console.log(error.message);

        setRes(data.message)
        
    }
   
      



    onClose(); // Close the modal after saving changes
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Edit Product
                </h3>


                 {/* Close button */}
                 <button
                  type="button"
                  className="absolute top-0 right-0 p-2 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>

                {/* Editable fields */}
                <div className="mt-2">
                  {/* Name */}
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    Value={editedProduct?.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="mt-2">
                  {/* Description */}
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedProduct?.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  ></textarea>
                </div>

                <div className="mt-2">
                  {/* Price */}
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={editedProduct?.price}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="mt-2">
                  {/* Category */}
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={editedProduct?.category}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="mt-2">
                  {/* Subcategory */}
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={editedProduct?.subcategory}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                {/* Save Changes button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>

                  <p>{res}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
