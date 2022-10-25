import { gql, useQuery } from "@apollo/client";
import { Avatar } from "@mantine/core";

const MY_AVATAR = gql`
  query myAvatar {
    organizerAvatar
  }
`;

const OrganizerAvatar = () => {
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
      />
    </div>
  );
};

export default OrganizerAvatar;
