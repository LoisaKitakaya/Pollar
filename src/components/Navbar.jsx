import { Popover } from "@mantine/core";

import FeaturesContainer from "./Navbar/FeaturesContainer";
import ResourcesContainer from "./Navbar/ResourcesContainer";

const Navbar = ({
  featureState,
  setFeatureState,
  resourcesState,
  setResourcesState,
}) => {
  return (
    <div className="flex items-center justify-between px-16 py-1 shadow-lg bg-slate-100">
      <a href="/" className="flex items-center">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665759533/documents/logos/logo_pollar_bird_resize_zfvonv.png"
          alt="logo"
        />
        <h1 className="text-3xl ml-2 header-font text-yellow-900 font-semibold pt-1">
          Pollar
        </h1>
      </a>

      <div className="flex items-center">
        <Popover
          width={375}
          position="bottom"
          withArrow
          shadow="md"
          opened={featureState}
          onChange={setFeatureState}
        >
          <Popover.Target>
            <p
              className="text-lg mx-4 hover:cursor-pointer hover:text-blue-900"
              onClick={() => setFeatureState((o) => !o)}
            >
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
          </Popover.Target>

          <Popover.Dropdown>
            {/* features container */}
            <FeaturesContainer />
            {/* features container */}
          </Popover.Dropdown>
        </Popover>
        {/* <a href="/" className="text-xl pt-1 mx-4">
          Features
        </a> */}
        <a href="/" className="text-lg mx-4 hover:text-blue-900">
          Pricing
        </a>
        <a href="/" className="text-lg mx-4 hover:text-blue-900">
          What's New
        </a>
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="md"
          opened={resourcesState}
          onChange={setResourcesState}
        >
          <Popover.Target>
            <p
              className="text-lg mx-4 hover:cursor-pointer hover:text-blue-900"
              onClick={() => setResourcesState((o) => !o)}
            >
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
          </Popover.Target>

          <Popover.Dropdown>
            {/* resource container */}
            <ResourcesContainer />
            {/* resource container */}
          </Popover.Dropdown>
        </Popover>
        {/* <a href="/" className="text-xl pt-1 mx-4">
          Resources
        </a> */}
      </div>

      <div className="flex items-center">
        <a
          href="/auth/signin/"
          className="rounded-md px-3 py-2 bg-emerald-300 mt-0 ml-4 hover:bg-emerald-400 shadow-md border-black"
        >
          Log in
        </a>
        <a
          href="/auth/signup/"
          className="rounded-md px-3 py-2 bg-sky-400 mt-0 ml-4 hover:bg-sky-500 shadow-md border-black"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Navbar;
