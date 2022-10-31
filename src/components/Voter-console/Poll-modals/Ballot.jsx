import { Modal, useMantineTheme } from "@mantine/core";

const Ballot = ({ openedBallot, setOpenedBallot, pollData }) => {
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
        opened={openedBallot}
        onClose={() => setOpenedBallot(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Vote on this poll</p>
        <form className="px-4">
          <label htmlFor="candidate" className="block mb-4">
            <span className="text-gray-700">
              Candidates selection
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <select
              name="pollid"
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
