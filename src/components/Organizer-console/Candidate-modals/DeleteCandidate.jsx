import { gql, useMutation } from "@apollo/client";
import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

import loader from "../../../assets/Lazy-Loader/loading.svg";

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
  if (loading) {
    notifyloading();
  } else {
    toast.dismiss(toastElem.current);
  }
  if (error) notifyError(error);

  return (
    <div>
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

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default DeleteCandidate;
