import { Modal, useMantineTheme } from "@mantine/core";

import axios from "axios";

const url = "https://democracy-app.up.railway.app/voters/avatar/";

const AvatarUpload = ({
  opened,
  setOpened,
  voterID,
  setIsLoading,
  setUpdated,
}) => {
  const theme = useMantineTheme();

  const handleSubmit = (data) => {
    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);

        setUpdated(true);
      });
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
      <p className="text-lg text-center mb-4">voter avatar</p>
      <form
        className="px-4"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            id: voterID,
            image: e.target.image.files[0],
          };

          handleSubmit(data);

          setOpened(false);
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

export default AvatarUpload;
