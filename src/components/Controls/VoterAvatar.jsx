import { gql, useQuery } from "@apollo/client";
import { Avatar } from "@mantine/core";
import { useState } from "react";
import { Skeleton } from "@mantine/core";

import AvatarUpload from "../Voter-console/Profile-modals/AvatarUpload";

const MY_AVATAR = gql`
  query myAvatar {
    voterAvatar
  }
`;

const VoterAvatar = () => {
  const [opened, setOpened] = useState(false);

  const { loading, error, data } = useQuery(MY_AVATAR);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return (
    <>
      <div className="mx-4 shadow-md rounded-full">
        <Skeleton height={38} circle />
      </div>
    </>
  );
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      <Avatar
        src={data.voterAvatar}
        alt="avatar"
        color="blue"
        radius="xl"
        className="cursor-pointer mx-4 shadow-md"
        onClick={() => setOpened(true)}
      />

      {/* upload organizer avatar */}
      <AvatarUpload opened={opened} setOpened={setOpened} />
      {/* upload organizer avatar */}
    </div>
  );
};

export default VoterAvatar;
