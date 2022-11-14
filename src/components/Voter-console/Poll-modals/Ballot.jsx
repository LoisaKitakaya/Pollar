import { Modal, useMantineTheme, Notification } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";

const CAST_VOTE = gql`
  mutation CastVote($pollId: String!, $candidateId: String!) {
    castVote(pollId: $pollId, candidateId: $candidateId) {
      ballot {
        poll {
          id
          seat
        }
        candidate {
          id
          firstName
          lastName
        }
        voter {
          id
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const Ballot = ({ openedBallot, setOpenedBallot, pollData }) => {
  const theme = useMantineTheme();

  const [castVote, { data, loading, error }] = useMutation(CAST_VOTE);

  if (data) {
    console.log(data);
    console.log("Account creation success.You can now log in.");
  }
  if (loading)
    return (
      <div className="fixed bottom-10 left-16 w-fit mx-auto shadow-md rounded-md">
        <Notification
          loading
          color="green"
          disallowClose
          className="w-fit bg-zinc-300 rounded-md"
          radius="md"
        >
          <span className="text-black text-xl">Loading... Please wait</span>
        </Notification>
      </div>
    );
  if (error) return `Submission error! ${error.message}`;

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
        opened={openedBallot}
        onClose={() => setOpenedBallot(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Vote on this poll</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            castVote({
              variables: {
                pollId: pollData.id,
                candidateId: e.target.candidateid.value,
              },
            });

            setOpenedBallot(false);
          }}
        >
          <label htmlFor="candidate" className="block mb-4">
            <span className="text-gray-700">
              Candidates selection
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <select
              name="candidateid"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            >
              <option disabled selected>
                Select a candidate you want to vote for
              </option>
              {typeof candidates != "undefined" && candidates != null ? (
                <>
                  {candidates.map((candidate, index) => {
                    const list = (
                      <option value={candidate.id} key={index}>
                        {candidate.firstName} {candidate.lastName}
                      </option>
                    );

                    return list;
                  })}
                </>
              ) : (
                <option value=""></option>
              )}
            </select>
          </label>
          <br />
          <button
            type="submit"
            className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
          >
            Vote
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Ballot;
