import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { gql, useMutation } from "@apollo/client";
import { Notification } from "@mantine/core";

const DELETE_POLL = gql`
  mutation ClosePoll($id: String!) {
    deletePoll(id: $id) {
      confirmation
    }
  }
`;

const GET_MY_POLLS = gql`
  query GetMyPolls {
    organizerPolls {
      id
      seat
      intro
      open
      beginDate
      endDate
      candidateSet {
        id
        firstName
        lastName
        bio
      }
    }
  }
`;

const DeletePoll = ({ PollID, deleteState, setDeleteState }) => {
  const [deletePoll, { data, loading, error }] = useMutation(DELETE_POLL, {
    refetchQueries: [
      { query: GET_MY_POLLS }, // DocumentNode object parsed with gql
    ],
  });

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
        >
          <span className="text-black text-xl">Loading... Please wait</span>
        </Notification>
      </div>
    );
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Tooltip label="delete poll" color="dark" withArrow>
        <ThemeIcon
          variant={deleteState}
          color="red"
          radius="md"
          size="lg"
          className="cursor-pointer mx-1"
          onClick={() =>
            deletePoll({
              variables: {
                id: PollID,
              },
            })
          }
          onMouseEnter={() => setDeleteState("fill")}
          onMouseLeave={() => setDeleteState("outline")}
        >
          <IconTrash />
        </ThemeIcon>
      </Tooltip>
    </div>
  );
};

export default DeletePoll;
