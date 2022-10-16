import { useState } from "react";
import { Tooltip } from "@mantine/core";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../pageTitle";

const Intersection = () => {
  PageTitle("Intersection");

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
      <div className="h-full">
        <div className="h-fit w-fit mx-auto my-56 flex items-center justify-between">
          <div className="w-1-4 h-1-4 m-2 rounded-md drop-shadow-lg hover:drop-shadow-xl border border-gray-400 hover:border-gray-900 bg-zinc-200 hover:bg-zinc-400">
            <Tooltip
              label="I don't have either an organizer or a voter account"
              color="violet"
              withArrow
            >
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <span className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </span>
                <h1 className="text-center text-4xl py-6 px-4">
                  I am new to Pollar
                </h1>
              </a>
            </Tooltip>
          </div>
          <div className="w-1-4 h-1-4 m-2 rounded-md drop-shadow-lg hover:drop-shadow-xl border border-gray-400 hover:border-gray-900 bg-zinc-200 hover:bg-zinc-400">
            <Tooltip label="I have a voter account" color="teal" withArrow>
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <span className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                    />
                  </svg>
                </span>
                <h1 className="text-center text-4xl py-6 px-4">
                  Voter console
                </h1>
              </a>
            </Tooltip>
          </div>
          <div className="w-1-4 h-1-4 m-2 rounded-md drop-shadow-lg hover:drop-shadow-xl border border-gray-400 hover:border-gray-900 bg-zinc-200 hover:bg-zinc-400">
            <Tooltip
              label="I have an organizer account"
              color="teal"
              withArrow
            >
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <span className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </span>
                <h1 className="text-center text-4xl py-6 px-4">
                  Organizer console
                </h1>
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
      {/* body */}

      {/* body */}
      <Footer />
      {/* body */}
    </div>
  );
};

export default Intersection;
