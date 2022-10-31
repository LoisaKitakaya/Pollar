import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const UPDATE_ORGANIZER = gql`
  mutation UpdateOrganizer(
    $username: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $country: String!
    $workspace: String!
  ) {
    updateOrganizer(
      username: $username
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      country: $country
      workspace: $workspace
    ) {
      organizer {
        id
        user {
          username
          firstName
          lastName
        }
        phone
        country
        workspaceSet {
          name
        }
      }
    }
  }
`;

const UpdateProfile = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  const [updateOrganizer, { data, loading, error }] =
    useMutation(UPDATE_ORGANIZER);

  const navigate = useNavigate();

  if (data) {
    console.log(data);
    console.log("Account registration success. Redirecting to console.");

    navigate("/app/organizer_console/");
  }
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

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
        <form className="px-4" onSubmit={(e) => {
            e.preventDefault()

            updateOrganizer({
              variables: {
                username: e.target.username.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                phone: e.target.phone.value,
                country: e.target.country.value,
                workspace: e.target.workspace.value,
              },
            });

            setOpened(false);
        }}>
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
          <label htmlFor="phone" className="block mb-4">
            <span className="text-gray-700">
              Phone<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +254725131828"
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
          <label htmlFor="workspace" className="block mb-4">
            <span className="text-gray-700">
              Workspace<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="workspace"
              placeholder="e.g. Medical society elections"
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
    </div>
  );
};

export default UpdateProfile;