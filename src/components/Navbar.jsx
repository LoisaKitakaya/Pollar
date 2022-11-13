import { HoverCard } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LogOut from "./Accounts/LogOut";
import FeaturesContainer from "./Navbar/FeaturesContainer";
import ResourcesContainer from "./Navbar/ResourcesContainer";

const Navbar = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(localStorage.getItem("authenticated"));

    console.log(status);
  }, [status]);

  return (
    <div className="flex items-center justify-between px-16 py-1 shadow-lg bg-slate-100">
      <Link to="/" className="flex items-center">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665759533/documents/logos/logo_pollar_bird_resize_zfvonv.png"
          alt="logo"
        />
        <h1 className="text-3xl ml-2 header-font text-yellow-900 font-semibold pt-1">
          Pollar
        </h1>
      </Link>

      <div className="flex items-center">
        <HoverCard width={500} position="bottom" withArrow shadow="md">
          <HoverCard.Target>
            <p className="text-lg mx-4 hover:cursor-pointer hover:text-blue-900">
              <span className="flex items-center">
                Features{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </p>
          </HoverCard.Target>

          <HoverCard.Dropdown>
            {/* features container */}
            <FeaturesContainer />
            {/* features container */}
          </HoverCard.Dropdown>
        </HoverCard>
        <Link to="/" className="text-lg mx-4 hover:text-blue-900">
          Pricing
        </Link>
        <Link to="/" className="text-lg mx-4 hover:text-blue-900">
          What's New
        </Link>
        <HoverCard width={250} position="bottom" withArrow shadow="md">
          <HoverCard.Target>
            <p className="text-lg mx-4 hover:cursor-pointer hover:text-blue-900">
              <span className="flex items-center">
                Resources{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </p>
          </HoverCard.Target>

          <HoverCard.Dropdown>
            {/* resource container */}
            <ResourcesContainer />
            {/* resource container */}
          </HoverCard.Dropdown>
        </HoverCard>
      </div>

      <div className="flex items-center">
        {status ? (
          <>
            <Link
              to="/intersection/"
              className="rounded-md px-3 py-2 bg-gray-500 mt-0 ml-4 hover:bg-gray-600 shadow-md border-black text-white"
            >
              Console
            </Link>
            <LogOut />
          </>
        ) : (
          <>
            <Link
              to="/auth/signin/"
              className="rounded-md px-3 py-2 bg-emerald-300 mt-0 ml-4 hover:bg-emerald-400 shadow-md border-black"
            >
              Log in
            </Link>
            <Link
              to="/auth/signup/"
              className="rounded-md px-3 py-2 bg-sky-400 mt-0 ml-4 hover:bg-sky-500 shadow-md border-black"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
