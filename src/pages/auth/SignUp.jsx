import { useState } from "react";
import Footer from "../../components/Footer";

import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";

const SignUp = () => {
  PageTitle("Sign up");

  const [features, setFeaturesState] = useState(false);
  const [resources, setResourcesState] = useState(false);

  return (
    <div>
      {/* navigation */}
      <Navbar
        featureState={features}
        setFeatureState={setFeaturesState}
        resourcesState={resources}
        setResourcesState={setResourcesState}
      />
      {/* navigation */}

      {/* body */}
      <div className="min-h-fit">
        <div className="bg-zinc-100 rounded-lg shadow-md border p-4 w-2/5 mx-auto my-20">
          <h1 className="text-xl text-center mb-4">Create user account</h1>
          <form className="px-4">
            <label htmlFor="username" className="block mb-4">
              <span className="text-gray-700">
                Username<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="text"
                name="username"
                placeholder="e.g. johnDoe54"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="first_name" className="block mb-4">
              <span className="text-gray-700">
                First name<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="text"
                name="first_name"
                placeholder="e.g. John"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="last_name" className="block mb-4">
              <span className="text-gray-700">
                Last name<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="text"
                name="last_name"
                placeholder="e.g. Doe"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="email" className="block mb-4">
              <span className="text-gray-700">
                Email<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="email"
                name="email"
                placeholder="e.g. johndoe54@gmail.com"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="password" className="block mb-4">
              <span className="text-gray-700">
                Password<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="password"
                name="password"
                placeholder="**************"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <label htmlFor="password2" className="block mb-4">
              <span className="text-gray-700">
                Username<span className="text-red-700 text-3xl">*</span>
              </span>
              <input
                type="password"
                name="password2"
                placeholder="**************"
                required
                className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
              />
            </label>
            <br />
            <button
              type="submit"
              className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      {/* body */}

      {/* footer */}
      <Footer />
      {/* footer */}
    </div>
  );
};

export default SignUp;
