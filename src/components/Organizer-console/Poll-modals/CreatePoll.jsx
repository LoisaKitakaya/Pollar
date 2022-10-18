import { Modal, useMantineTheme } from "@mantine/core";

const CreatePoll = ({ openedCreate, setOpenedCreate }) => {
  const theme = useMantineTheme();

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
        opened={openedCreate}
        onClose={() => setOpenedCreate(false)}
        withCloseButton={false}
        size="xl"
      >
        <p className="text-lg text-center">Create poll modal</p>
      </Modal>
    </div>
  );
};

export default CreatePoll;
