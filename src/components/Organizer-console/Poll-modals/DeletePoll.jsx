import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { gql, useMutation } from "@apollo/client";

const DELETE_POLL = gql`
  mutation ClosePoll($id: String!) {
    deletePoll(id: $id) {
      confirmation
    }
  }
`;

const DeletePoll = ({ PollID }) => {
  const [deletePoll, { data, loading, error }] = useMutation(DELETE_POLL);

  if (data) {
    console.log(data);
    console.log("This poll has been closed.");

    window.location.reload(false);
  }
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Tooltip label="delete poll" color="dark" withArrow>
        <ThemeIcon
          variant="outline"
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
        >
          <IconTrash />
        </ThemeIcon>
      </Tooltip>
    </div>
  );
};

export default DeletePoll;
