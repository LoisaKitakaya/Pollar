import { gql, useQuery } from "@apollo/client";

const MY_AVATAR = gql`
  query myAvatar {
    voterAvatar
  }
`;

const VoterImage = () => {
  const { loading, error, data } = useQuery(MY_AVATAR);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      <img
        src={data.voterAvatar}
        alt="organizer avatar"
        className="rounded-md"
      />
    </div>
  );
};

export default VoterImage;
