import { Modal, useMantineTheme } from "@mantine/core";

const EditCandidate = ({ candidateData, viewCandidate, setViewCandidate }) => {
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
        opened={viewCandidate}
        onClose={() => setViewCandidate(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Edit candidate</p>
        <div className="mb-4"></div>
      </Modal>
    </div>
  );
};

export default EditCandidate;
