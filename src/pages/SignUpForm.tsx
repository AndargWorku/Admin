

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { fetchShopsSuccess, fetchShopsFailure } from './actions';

// const ShopPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const shops = useSelector((state) => state.shops);

//   useEffect(() => {
//     fetchShops();
//   }, []);

//   const fetchShops = async () => {
//     try {
//       const response = await axios.get('https://sheba-app.onrender.com/api/shops/user/all');
//       dispatch(fetchShopsSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchShopsFailure(error));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Shops</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {shops.map((shop) => (
//           <div key={shop.id} className="bg-white rounded-lg shadow-xl p-4">
//             <h2 className="text-lg font-bold mb-2">{shop.name}</h2>
//             <p className="mb-2">{shop.description}</p>
//             {/* Display other shop details */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopPage;









import React from 'react';
import '../styles/login.css'
const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white font-bold">Create an Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"> 
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm  text-gray-700 dark:text-white" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm  text-gray-700 dark:text-white" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm  text-gray-700 dark:text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline-blue"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm  text-gray-700 dark:text-white" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm  text-gray-700 dark:text-white" htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                <button
                  className=" login mt-5 tracking-wide font-semibold
                   w-full py-4 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">
                    Login
                  </span>
                </button>

                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className=" nb inline-block text-sm  align-baseline "
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className=" nb inline-block text-sm  align-baseline"
                    href="./login"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')` }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

















