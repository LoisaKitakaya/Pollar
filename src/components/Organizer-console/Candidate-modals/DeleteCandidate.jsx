import { gql, useMutation } from "@apollo/client";
import { Notification } from "@mantine/core";
import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

const DELETE_CANDIDATE = gql`
  mutation DeleteCandidate($id: String!) {
    deleteCandidate(id: $id) {
      confirmation
    }
  }
`;

const GET_MY_CANDIDATES = gql`
  query GetMyCandidates {
    organizerCandidates {
      id
      firstName
      lastName
      email
      country
      bio
      poll {
        seat
        beginDate
        endDate
        workspace {
          name
          voterLimit
          pollLimit
        }
      }
    }
  }
`;

const DeleteCandidate = ({ candidateData }) => {
  const [deleteCandidate, { data, loading, error }] = useMutation(
    DELETE_CANDIDATE,
    {
      refetchQueries: [
        { query: GET_MY_CANDIDATES }, // DocumentNode object parsed with gql
      ],
    }
  );

  if (data) {
    console.log(data);
    console.log("This poll has been closed.");
  }
  if (loading)
    return (
      <div className="fixed bottom-10 left-16 w-fit mx-auto shadow-md rounded-md">
        <Notification
          loading
          color="green"
          disallowClose
          className="w-fit bg-zinc-300 rounded-md"
          radius="md"
        >
          <span className="text-black text-xl">Loading... Please wait</span>
        </Notification>
      </div>
    );
  if (error) return `Submission error! ${error.message}`;

  return (
    <Tooltip label="delete candidate" color="dark" withArrow>
      <ThemeIcon
        variant="light"
        color="red"
        radius="sm"
        size="sm"
        className="cursor-pointer z-50"
        onClick={() =>
          deleteCandidate({
            variables: {
              id: candidateData.id,
            },
          })
        }
      >
        <IconTrash />
      </ThemeIcon>
    </Tooltip>
  );
};

export default DeleteCandidate;
