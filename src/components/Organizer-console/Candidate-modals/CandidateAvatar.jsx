import { gql, useQuery } from "@apollo/client";

const CANDIDATE_AVATAR = gql`
  query CandidateAvatar($id: String!) {
    candidateAvatar(id: $id)
  }
`;

const CandidateAvatar = ({ CandidateID }) => {
  const { loading, error, data } = useQuery(CANDIDATE_AVATAR, {
    variables: { id: CandidateID },
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
        className="w-full h-60 rounded-t-lg"
        src={data.candidateAvatar}
        alt="candidate avatar"
      />
    </div>
  );
};

export default CandidateAvatar;
