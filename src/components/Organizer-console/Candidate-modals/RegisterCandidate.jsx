import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

import loader from "../../../assets/Lazy-Loader/loading.svg";

const REGISTER_CANDIDATE = gql`
  mutation AddCandidate(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $country: String!
    $bio: String!
  ) {
    registerCandidate(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      country: $country
      bio: $bio
    ) {
      candidate {
        id
        firstName
        lastName
        email
        country
        bio
        image
        poll {
          seat
          intro
          beginDate
          endDate
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

const RegisterCandidate = ({
  registerCandidateView,
  setRegisterCandidateView,
  allPolls,
}) => {
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

  const [registerCandidate, { data, loading, error }] = useMutation(
    REGISTER_CANDIDATE,
    {
      refetchQueries: [{ query: GET_MY_POLLS }, { query: GET_MY_CANDIDATES }],
    }
  );

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
        opened={registerCandidateView}
        onClose={() => setRegisterCandidateView(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Register candidate to a poll</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            registerCandidate({
              variables: {
                id: e.target.pollid.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                email: e.target.email.value,
                country: e.target.country.value,
                bio: e.target.bio.value,
              },
            });

            setRegisterCandidateView(false);
          }}
        >
          <label htmlFor="firstname" className="block mb-4">
            <span className="text-gray-700">
              First name<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="firstname"
              placeholder="e.g. John"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="lastname" className="block mb-4">
            <span className="text-gray-700">
              Last name<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="lastname"
              placeholder="e.g. Doe"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="email" className="block mb-4">
            <span className="text-gray-700">
              Email<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="email"
              name="email"
              placeholder="e.g. johndoe54@gmail.com"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="country" className="block mb-4">
            <span className="text-gray-700">
              Country<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="country"
              placeholder="e.g. Kenya"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="country" className="block mb-4">
            <span className="text-gray-700">
              Poll<span className="text-red-700 text-3xl">*</span>
            </span>
            <select
              name="pollid"
              placeholder="e.g. Kenya"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            >
              <option disabled selected>
                Select poll candidate will take part in
              </option>
              {allPolls.map((poll, index) => {
                const list = (
                  <>
                    <option value={poll.id} key={index}>
                      {poll.seat}
                    </option>
                  </>
                );

                return list;
              })}
            </select>
          </label>
          <label htmlFor="bio" className="block mb-4">
            <span className="text-gray-700">
              Bio
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <textarea
              cols="30"
              rows="10"
              name="bio"
              placeholder="Short intro about this candidate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200
              border-gray-300 focus:border-indigo-300 focus:ring-indigo-200
              focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            ></textarea>
          </label>
          <br />
          <button
            type="submit"
            className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
          >
            Register
          </button>
        </form>
      </Modal>

      {/* Notification */}
      <ToastContainer closeButton={false} />
      {/* Notification */}
    </div>
  );
};

export default RegisterCandidate;
