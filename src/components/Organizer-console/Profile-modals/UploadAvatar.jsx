import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

const MY_ACCOUNT = gql`
  query MyAccount {
    myOrganizerAccount {
      id
      user {
        id
        username
        firstName
        lastName
        email
      }
      phone
      country
      paidStatus
      runningPackage
      workspaceSet {
        name
        voterLimit
        pollLimit
      }
    }
  }
`;

const url = "http://127.0.0.1:8000/organizers/upload_avatar/";

const UploadAvatar = ({ opened, setOpened }) => {
  const theme = useMantineTheme();

  const { loading, error, data } = useQuery(MY_ACCOUNT);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  const organizerData = data.myOrganizerAccount;

  const handleSubmit = (data) => {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    window.location.reload(false);
  };

  return (
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
      <p className="text-lg text-center">Organizer avatar</p>
      <form
        className="px-4"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            id: organizerData.id,
            image: e.target.image.files[0],
          };

          handleSubmit(data);
        }}
      >
        <input
          type="file"
          name="image"
          required
          className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
        />
        <br />
        <button
          type="submit"
          className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default UploadAvatar;
