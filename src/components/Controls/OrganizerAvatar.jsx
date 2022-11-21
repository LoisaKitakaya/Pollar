import { Avatar } from "@mantine/core";
import { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";

import axios from "axios";

import UploadAvatar from "../Organizer-console/Profile-modals/UploadAvatar";

const url = "https://democracy-app.up.railway.app/organizers/avatar/";

const OrganizerAvatar = ({ organizerID }) => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (updated) {
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
        .finally(() => {
          setIsLoading(false);

          setUpdated(false);
        });
    }

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
  }, [organizerID, updated]);

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
      <UploadAvatar
        opened={opened}
        setOpened={setOpened}
        organizerID={organizerID}
        setIsLoading={setIsLoading}
        setUpdated={setUpdated}
      />
      {/* upload organizer avatar */}
    </div>
  );
};

export default OrganizerAvatar;
