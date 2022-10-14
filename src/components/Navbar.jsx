import { Popover } from "@mantine/core";

const Navbar = ({
  featureState,
  setFeatureState,
  resourcesState,
  setResourcesState,
}) => {
  return (
    <div className="flex items-center justify-between px-16 py-1">
      <a href="/" className="flex items-center">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665714259/documents/logos/logo_pollar_bird_hnflza.png"
          alt="logo"
        />
        <h1 className="text-3xl ml-2">Pollar</h1>
      </a>

      <div className="flex items-center">
        <Popover
          width={700}
          position="bottom"
          withArrow
          shadow="md"
          opened={featureState}
          onChange={setFeatureState}
        >
          <Popover.Target>
            <p
              className="text-lg mx-4 hover:cursor-pointer"
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

          <Popover.Dropdown>Dropdown</Popover.Dropdown>
        </Popover>
        {/* <a href="/" className="text-xl pt-1 mx-4">
          Features
        </a> */}
        <a href="/" className="text-lg mx-4">
          Pricing
        </a>
        <a href="/" className="text-lg mx-4">
          What's New
        </a>
        <Popover
          width={700}
          position="bottom"
          withArrow
          shadow="md"
          opened={resourcesState}
          onChange={setResourcesState}
        >
          <Popover.Target>
            <p
              className="text-lg mx-4 hover:cursor-pointer"
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

          <Popover.Dropdown>Dropdown</Popover.Dropdown>
        </Popover>
        {/* <a href="/" className="text-xl pt-1 mx-4">
          Resources
        </a> */}
      </div>

      <div className="flex items-center">
        <a
          href="/"
          className="rounded-md px-3 py-2 bg-emerald-300 mt-0 ml-4 hover:bg-emerald-400"
        >
          Log in
        </a>
        <a
          href="/"
          className="rounded-md px-3 py-2 bg-blue-400 mt-0 ml-4 hover:bg-blue-500"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Navbar;
