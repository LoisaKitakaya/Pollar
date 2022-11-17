import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";

import loader from "../../../assets/Lazy-Loader/loading.svg";

const UPDATE_VOTER = gql`
  mutation UpdateVoter(
    $username: String!
    $firstName: String!
    $lastName: String!
    $country: String!
  ) {
    updateVoter(
      username: $username
      firstName: $firstName
      lastName: $lastName
      country: $country
    ) {
      voter {
        id
        country
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const MY_ACCOUNT = gql`
  query MyAccount {
    myVoterAccount {
      id
      user {
        username
        firstName
        lastName
        email
      }
      country
      workspace {
        id
        name
        organizer {
          id
          phone
          user {
            username
            firstName
            lastName
            email
          }
        }
      }
    }
  }
`;

const ProfileUpdate = ({ opened, setOpened }) => {
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

  const [updateVoter, { data, loading, error }] = useMutation(UPDATE_VOTER, {
    refetchQueries: [{ query: MY_ACCOUNT }],
  });

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authenticated");

    navigate("/auth/signin/");
  };

  if (data) {
    console.log(data);

    logOut();
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
        withCloseButton={false}
        size="lg"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <h1 className="text-xl text-center mb-4">Update profile</h1>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            alert("Login again to have the changes take effect");

            updateVoter({
              variables: {
                username: e.target.username.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                country: e.target.country.value,
              },
            });

            setOpened(false);
          }}
        >
          <label htmlFor="username" className="block mb-4">
            <span className="text-gray-700">
              Username<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="username"
              placeholder="e.g. johnDoe54"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
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

export default ProfileUpdate;
