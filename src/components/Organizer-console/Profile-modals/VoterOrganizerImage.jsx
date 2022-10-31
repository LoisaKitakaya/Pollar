import { gql, useQuery } from "@apollo/client";

const MY_AVATAR = gql`
  query myAvatar($id: String!) {
    voterOrganizerImage(id: $id)
  }
`;

const VoterOrganizerImage = ({organizerID}) => {
  const { loading, error, data } = useQuery(MY_AVATAR, {
    variables: { id: organizerID },
  });

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      <img
        src={data.voterOrganizerImage}
        alt="organizer avatar"
        className="rounded-md"
      />
    </div>
  );
};

export default VoterOrganizerImage;
