import { useState, useEffect } from "react";
import { Loader, Tooltip } from "@mantine/core";

import axios from "axios";

const url = "http://127.0.0.1:8000/voters/avatar/";

const VoterImage = ({ voterID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (updated) {
      setIsLoading(true);

      const params = {
        id: voterID,
      };

      axios
        .get(url, {
          params: params,
        })
        .then((response) => {
          console.log(response.data);

          setData(response.data.image);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);

          setUpdated(false);
        });
    }

    setIsLoading(true);

    const params = {
      id: voterID,
    };

    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        console.log(response.data);

        setData(response.data.image);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [voterID, updated]);

  return (
    <div className="rounded-md border w-2/4 shadow-md h-full my-4 flex">
      <img src={data} alt="organizer avatar" className="rounded-md w-full" />
      <div className="mx-2">
        {isLoading ? (
          <button
            type="button"
            className="bg-zinc-300 hover:bg-zinc-400 rounded-md p-1 mb-3 shadow-md"
          >
            <Loader size="sm" />
          </button>
        ) : (
          <>
            <Tooltip label="Refresh" color="dark" position="right" withArrow>
              <button
                type="button"
                className="bg-zinc-300 hover:bg-zinc-400 rounded-md p-1 mb-3 shadow-md"
                onClick={() => setUpdated(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default VoterImage;
