import { Avatar } from "@mantine/core";
import { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";

import axios from "axios";

import AvatarUpload from "../Voter-console/Profile-modals/AvatarUpload";

const url = "http://127.0.0.1:8000/voters/avatar/";

const VoterAvatar = ({ voterID }) => {
  const [opened, setOpened] = useState(false);
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
    <div>
      {isLoading ? (
        <>
          <div className="mx-4 shadow-md rounded-full">
            <Skeleton height={38} circle />
          </div>
        </>
      ) : (
        <Avatar
          src={data}
          alt="avatar"
          color="blue"
          radius="xl"
          className="cursor-pointer mx-4 shadow-md"
          onClick={() => setOpened(true)}
        />
      )}

      {/* upload organizer avatar */}
      <AvatarUpload
        opened={opened}
        setOpened={setOpened}
        voterID={voterID}
        setIsLoading={setIsLoading}
        setUpdated={setUpdated}
      />
      {/* upload organizer avatar */}
    </div>
  );
};

export default VoterAvatar;
