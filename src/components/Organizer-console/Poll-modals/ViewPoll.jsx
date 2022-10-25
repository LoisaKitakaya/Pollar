import { Carousel } from "@mantine/carousel";
import { Modal, Badge, useMantineTheme } from "@mantine/core";
import CandidateAvatar from "../Candidate-modals/CandidateAvatar";

const ViewPoll = ({ openedView, setOpenedView, pollData }) => {
  const theme = useMantineTheme();

  let candidates = pollData.candidateSet;

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
        opened={openedView}
        onClose={() => setOpenedView(false)}
        withCloseButton={false}
        size="70%"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-3xl font-light pl-1">Poll details</p>
          {pollData.open ? (
            <Badge color="teal" size="lg" variant="filled">
              Status: Open{" "}
              <span className="font-light text-md">
                {"(elections can be held on this poll)"}
              </span>
            </Badge>
          ) : (
            <Badge color="yellow" size="lg" variant="filled">
              Status: Closed{" "}
              <span className="font-light text-md">
                {"(elections cannot be held on this poll)"}
              </span>
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="rounded-lg border py-2 px-4">
            <p className="font-light text-lg text-gray-600 mb-2">
              Contended position
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {pollData.seat}
            </p>
          </div>
          <div className="flex items-center">
            <div className="rounded-lg border py-2 px-4 mx-2">
              <p className="font-light text-lg text-gray-600 mb-2">Begins on</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pollData.beginDate}
              </p>
            </div>
            <div className="rounded-lg border py-2 px-4 mx-2">
              <p className="font-light text-lg text-gray-600 mb-2">Ends on</p>
              <p className="text-2xl font-semibold text-gray-900">
                {pollData.endDate}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border py-2 px-4 mb-4">
          <p className="font-light text-lg text-gray-600 mb-2">
            Short intro about this election
          </p>
          <p className="text-gray-900">{pollData.intro}</p>
        </div>
        <hr className="mb-4" />
        <div className="rounded-lg border py-2 px-4 mb-4">
          <p className="font-light text-lg text-gray-600 mb-2">
            Contending candidates
          </p>
          {typeof candidates != "undefined" &&
          candidates != null &&
          candidates.length != null &&
          candidates.length > 0 ? (
            <Carousel
              align="start"
              slideSize="100%"
              height={200}
              slideGap="xl"
              loop
            >
              {candidates.map((candidate, index) => {
                const list = (
                  <>
                    <div
                      className="rounded-lg border border-gray-300 shadow-lg m-2 w-56 h-fit cursor-pointer"
                      key={index}
                    >
                      <CandidateAvatar CandidateID={candidate.id} />
                      <div className="m-1 py-1 px-2">
                        <p>
                          {candidate.firstName} {candidate.lastName}
                        </p>
                      </div>
                    </div>
                  </>
                );

                return list;
              })}
            </Carousel>
          ) : (
            <div>
              <p className="text-xl">
                No candidates have been registered to this poll yet.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewPoll;
