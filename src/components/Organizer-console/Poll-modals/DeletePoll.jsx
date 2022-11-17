import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

import loader from "../../../assets/Lazy-Loader/loading.svg";

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

const DeletePoll = ({ PollID }) => {
  const toastElem = useRef(null);

  const notifyError = (error) =>
    toast.error(`${error.message}`, {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: "ro-error",
      className: "bg-error",
      delay: 500,
    });

  const notifyloading = () =>
    (toastElem.current = toast.info("Loading... Please wait", {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: "ro-loading",
      className: "bg-info",
      autoClose: false,
      icon: ({ theme, type }) => <img src={loader} alt="loader" />,
    }));

  const [deletePoll, { data, loading, error }] = useMutation(DELETE_POLL, {
    refetchQueries: [
      { query: GET_MY_POLLS }, // DocumentNode object parsed with gql
    ],
  });

  if (data) {
    console.log(data);
  }
  if (loading) {
    notifyloading();
  } else {
    toast.dismiss(toastElem.current);
  }
  if (error) notifyError(error);

  return (
    <div>
      <Tooltip label="delete poll" color="dark" withArrow>
        <ThemeIcon
          variant="fill"
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

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default DeletePoll;
