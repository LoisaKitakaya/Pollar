import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";

import axios from "axios";

const url = "http://127.0.0.1:8000/organizers/avatar/";

const VoterOrganizerImage = ({ organizerID }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const params = {
      id: organizerID,
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
  }, [organizerID]);

  return (
    <div className="rounded-md border w-2/4 shadow-md h-full my-4">
      {isLoading ? (
        <>
          <div className="rounded-md w-full py-28">
            <Loader className="mx-auto" />
          </div>
        </>
      ) : (
        <>
          <img
            src={data}
            alt="organizer avatar"
            className="rounded-md w-full"
          />
        </>
      )}
    </div>
  );
};

export default VoterOrganizerImage;
