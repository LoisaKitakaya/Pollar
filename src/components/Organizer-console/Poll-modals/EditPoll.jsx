import { Modal, useMantineTheme } from "@mantine/core";

const EditPoll = ({ openedEdit, setOpenedEdit }) => {
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
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        withCloseButton={false}
        size="xl"
      >
        <p className="text-lg text-center">Edit poll modal</p>
      </Modal>
    </div>
  );
};

export default EditPoll;
