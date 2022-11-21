import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";

import axios from "axios";

const url = "https://democracy-app.up.railway.app/candidates/avatar/";

const CandidateAvatar = ({
  CandidateID,
  updated,
  setUpdated,
  isLoading,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (updated && isLoading) {
      setLoading(true);

      const params = {
        id: CandidateID,
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
          setLoading(false);

          setUpdated(false);
        });
    }

    setLoading(true);

    const params = {
      id: CandidateID,
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
      .finally(() => setLoading(false));
  }, [CandidateID, updated, setUpdated, isLoading]);

  return (
    <div>
      {loading ? (
        <>
          <div className="w-full h-60 py-28 rounded-t-lg">
            <Loader className="mx-auto" />
          </div>
        </>
      ) : (
        <>
          <img
            className="w-full h-60 rounded-t-lg"
            src={data}
            alt="candidate avatar"
          />
        </>
      )}
    </div>
  );
};

export default CandidateAvatar;
