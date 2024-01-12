import React,{useState} from 'react'
import { Link,useAsyncError,useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import { SignOut } from '../components/SignOut'



export const Merchant = () => {

  const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name:"",
      description:"",
      price:"",
      category:"",
      subcategory:"",
      productImage:""
      
    });

  const token = Cookies.get("acess_token");
  const [result, setResult] = useState("");
  const [files,setFiles] = useState("")


    const handelSubmit = async () =>{
      // e.preventDefault();
      try {

        
        if (files){

          const newFormData = new FormData();

          newFormData.append("productImage",files);

          setFormData({...formData, productImage: newFormData});

          // for(let key in formData){

          //    newFormData.append(key,formData[key]);

          // }

          console.log(formData);
          const res = await fetch("http://localhost:3000/products/create",{
          method:"POST",
          headers: {
            "authorization" : token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFormData),
        })

        const data  = await res.json();

        console.log(data)
        }else{
          console.log("No file selected")
        }

        
        
      } catch (error) {

        console.log(error)
        
      }

    }




    

const handelChange = (e) => {

  if(e.target.id == "productImage"){
    setFiles(e.target.files[0])
  }else{
      // Handle other input types (text, etc.)
      setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  
       
};

  return (
    <div>
        <section>

<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">


  <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
    
    <h2 className="text-center text-2xl font-bold leading-tight text-black">
      Create a new product
    </h2>
   
    <form className="mt-8">
      <div className="space-y-5">
      <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {' '}
            Name{' '}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id = "name"
              onChange={handelChange}
              placeholder="Enter your product name"
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {' '}
            Product description{' '}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id='description'
              onChange={handelChange}
              placeholder="Enter product description"
            ></input>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {' '}
              price{' '}
            </label>
           
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              id='price'
              onChange={handelChange}
              placeholder="Price"
            ></input>
          </div>
          <div className="mt-2">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {' '}
              Category{' '}
            </label>
           
          </div>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id='category'
              onChange={handelChange}
              placeholder="Enter category"
            ></input>
          </div>

          <div className="mt-2">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {' '}
             Sub Category{' '}
            </label>
           
          </div>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id='subcategory'
              onChange={handelChange}
              placeholder="Enter subcategory"
            ></input>
          </div>

          <div className="mt-2">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {' '}
              Choose Files{' '}
            </label>
           
          </div>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="file"
              id='productImage'
              onChange={handelChange}
              multiple
              placeholder="Choose images"
            ></input>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handelSubmit}
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            Create Product
          </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            {result}
          </p>
        </div>
      </div>
    </form>

  <SignOut callBack={()=> {
     Cookies.remove("acess_token");
     Cookies.remove("role");
     navigate("/")
  }} />
  
  </div>

</div>

</section>

    </div>
  )
}
