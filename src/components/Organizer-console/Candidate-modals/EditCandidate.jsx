import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import ImageForm from "./ImageForm";
import DetailForm from "./DetailForm";

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
        image
      }
    }
  }
`;

const EditCandidate = ({ editCandidate, setEditCandidate }) => {
  const theme = useMantineTheme();

  const { loading, error, data } = useQuery(GET_MY_POLLS);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

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
        <DetailForm allPolls={data.organizerPolls} />
      </Modal>
    </div>
  );
};

export default EditCandidate;
