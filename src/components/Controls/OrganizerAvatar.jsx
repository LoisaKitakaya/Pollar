import { gql, useQuery } from "@apollo/client";
import { Avatar } from "@mantine/core";
import { useState } from "react";

import UploadAvatar from "../Organizer-console/Profile-modals/UploadAvatar";

const MY_AVATAR = gql`
  query myAvatar {
    organizerAvatar
  }
`;

const OrganizerAvatar = () => {
  const [opened, setOpened] = useState(false);

  const { loading, error, data } = useQuery(MY_AVATAR);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      <Avatar
        src={data.organizerAvatar}
        alt="avatar"
        color="blue"
        radius="xl"
        className="cursor-pointer mx-4 shadow-md"
        onClick={() => setOpened(true)}
      />

      {/* upload organizer avatar */}
      <UploadAvatar opened={opened} setOpened={setOpened} />
      {/* upload organizer avatar */}
    </div>
  );
};

export default OrganizerAvatar;
