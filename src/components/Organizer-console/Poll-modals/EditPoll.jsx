import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

import loader from "../../../assets/Lazy-Loader/loading.svg";

const UPDATE_POLL = gql`
  mutation UpdatePoll(
    $id: String!
    $seat: String!
    $intro: String!
    $beginDate: Date!
    $endDate: Date!
  ) {
    updatePoll(
      id: $id
      seat: $seat
      intro: $intro
      beginDate: $beginDate
      endDate: $endDate
    ) {
      poll {
        id
        seat
        intro
        beginDate
        endDate
        organizer {
          id
          user {
            firstName
            lastName
          }
        }
        workspace {
          name
          pollLimit
          voterLimit
        }
      }
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

const EditPoll = ({ openedEdit, setOpenedEdit, pollData }) => {
  const theme = useMantineTheme();

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

  const [updatePoll, { data, loading, error }] = useMutation(UPDATE_POLL, {
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
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Update poll</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            updatePoll({
              variables: {
                id: pollData.id,
                seat: e.target.seat.value,
                intro: e.target.intro.value,
                beginDate: e.target.begindate.value,
                endDate: e.target.enddate.value,
              },
            });

            setOpenedEdit(false);
          }}
        >
          <label htmlFor="seat" className="block mb-4">
            <span className="text-gray-700">
              Seat<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="seat"
              placeholder="e.g. Club president"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="intro" className="block mb-4">
            <span className="text-gray-700">
              Short intro about this election
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <textarea
              cols="30"
              rows="10"
              name="intro"
              placeholder="About this poll"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200
              border-gray-300 focus:border-indigo-300 focus:ring-indigo-200
              focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            ></textarea>
          </label>
          <label htmlFor="begindate" className="block mb-4">
            <span className="text-gray-700">
              Begin date<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="date"
              name="begindate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="enddate" className="block mb-4">
            <span className="text-gray-700">
              End date<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="date"
              name="enddate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <br />
          <button
            type="submit"
            className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
          >
            Update
          </button>
        </form>
      </Modal>

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default EditPoll;
