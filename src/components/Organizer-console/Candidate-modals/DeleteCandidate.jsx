import { gql, useMutation } from "@apollo/client";

const DELETE_CANDIDATE = gql`
  mutation DeleteCandidate($id: String!) {
    deleteCandidate(id: $id) {
      confirmation
    }
  }
`;

const DeleteCandidate = ({ candidateData }) => {
  const [deleteCandidate, { data, loading, error }] =
    useMutation(DELETE_CANDIDATE);

  if (data) {
    console.log(data);
    console.log("This poll has been closed.");

    window.location.reload(false);
  }
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <span
      onClick={() =>
        deleteCandidate({
          variables: {
            id: candidateData.id,
          },
        })
      }
    >
      Delete
    </span>
  );
};

export default DeleteCandidate;
