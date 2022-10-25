import { Modal, useMantineTheme } from "@mantine/core";
import CandidateAvatar from "./CandidateAvatar";

const ViewCandidate = ({ candidateData, viewCandidate, setViewCandidate }) => {
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
        size="70%"
      >
        <div className="mb-4 w-1/4 mx-auto">
          <CandidateAvatar CandidateID={candidateData.id} />
        </div>
        <div className="mb-4 flex items-center">
          <div className="py-2 px-4 ">
            <p className="font-light text-lg text-gray-600 mb-2">First name</p>
            <p className="text-2xl font-semibold text-gray-900">
              {candidateData.firstName}
            </p>
          </div>
          <div className="py-2 px-4 ml-4">
            <p className="font-light text-lg text-gray-600 mb-2">Last name</p>
            <p className="text-2xl font-semibold text-gray-900">
              {candidateData.lastName}
            </p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <div className="py-2 px-4">
            <p className="font-light text-lg text-gray-600 mb-2">Country</p>
            <p className="text-2xl font-semibold text-gray-900">
              {candidateData.country}
            </p>
          </div>
          <div className="py-2 px-4 ml-4">
            <p className="font-light text-lg text-gray-600 mb-2">Email</p>
            <p className="text-2xl font-semibold text-gray-900">
              {candidateData.email}
            </p>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <div className="py-2 px-4">
            <p className="font-light text-lg text-gray-600 mb-2">
              Contending for
            </p>
            {/* {typeof candidateData.poll != "undefined" &&
            candidateData.poll != null ? (
              <p className="text-2xl font-semibold text-gray-900">
                {candidateData.poll.seat}
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900"></p>
            )} */}
          </div>
          <div className="py-2 px-4 ml-4">
            <p className="font-light text-lg text-gray-600 mb-2">Workspace</p>
            {/* {typeof candidateData.poll.workspace != "undefined" &&
            candidateData.poll.workspace != null ? (
              <p className="text-2xl font-semibold text-gray-900">
                {candidateData.poll.workspace.name}
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900"></p>
            )} */}
          </div>
        </div>
        <div className="py-2 px-4 mb-4">
          <p className="font-light text-lg text-gray-600 mb-2">Candidate bio</p>
          <p className="text-gray-900">{candidateData.bio}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ViewCandidate;
