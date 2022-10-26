import { Modal, useMantineTheme } from "@mantine/core";
import ImageForm from "./ImageForm";
import DetailForm from "./DetailForm";

const EditCandidate = ({ editCandidate, setEditCandidate, candidateData }) => {
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
        opened={editCandidate}
        onClose={() => setEditCandidate(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Candidate avatar</p>
        <ImageForm />
        <hr className="my-4" />
        <p className="text-lg text-center">Candidate details</p>
        <DetailForm candidateData={candidateData} />
      </Modal>
    </div>
  );
};

export default EditCandidate;
