import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

export function SignIn() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");
  const [loading,setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)

      if (data.sucess == true) {
       
        setResult(data.sucess);
        Cookies.set("acess_token", data.token, { expires: 7 });
        Cookies.set("role", data.user.role, { expires:7});
        if(data.user.role == "merchant"){
          navigate("/merchantDashboard");
        }else{
          navigate("/home");
        }
        setLoading(false)
        console.log(data.token);
      } else {
        setResult(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setResult(error.message);
    }
  };

  
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}

            <Link className="font-semibold text-black transition-all duration-200 hover:underline" to={'/signup'}>
           
              Create a free account
            
            </Link>
          </p>
          <form onSubmit={handelSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                  id='email'
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={handelChange}

                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                  id = "password"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    onChange={handelChange}
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                 {loading ? "Loading ..." :  "Sign In" }  
                </button>

                <p className="mt-2 text-center text-sm text-gray-600">
                  {result}
                </p>
              </div>
            </div>
          </form>
        
        </div>
      </div>
    </section>
  )
}
