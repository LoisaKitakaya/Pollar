import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconLockAccess } from "@tabler/icons";
import { gql, useMutation } from "@apollo/client";

const CLOSE_POLL = gql`
  mutation ClosePoll($id: String!) {
    closePoll(id: $id) {
      confirmation
    }
  }
`;

const ClosePoll = ({ PollID }) => {
  const [closePoll, { data, loading, error }] = useMutation(CLOSE_POLL);

  if (data) {
    console.log(data);
    console.log("This poll has been closed.");

    window.location.reload(false);
  }
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Tooltip label="close poll" color="dark" withArrow>
        <ThemeIcon
          variant="outline"
          color="orange"
          radius="md"
          size="lg"
          className="cursor-pointer mx-1"
          onClick={() => closePoll({
            variables: {
                id: PollID
            }
          })}
        >
          <IconLockAccess />
        </ThemeIcon>
      </Tooltip>
    </div>
  );
};

export default ClosePoll;
