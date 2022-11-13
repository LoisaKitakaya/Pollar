import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { Notification } from "@mantine/core";

const CREATE_POLL = gql`
  mutation CreatePoll(
    $seat: String!
    $intro: String!
    $beginDate: Date!
    $endDate: Date!
  ) {
    createPoll(
      seat: $seat
      intro: $intro
      beginDate: $beginDate
      endDate: $endDate
    ) {
      poll {
        id
        seat
        intro
        beginDate
        endDate
        organizer {
          id
          user {
            firstName
            lastName
          }
        }
        workspace {
          name
          pollLimit
          voterLimit
        }
      }
    }
  }
`;

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
      }
    }
  }
`;

const CreatePoll = ({ openedCreate, setOpenedCreate }) => {
  const theme = useMantineTheme();

  const [createPoll, { data, loading, error }] = useMutation(CREATE_POLL, {
    refetchQueries: [
      { query: GET_MY_POLLS }, // DocumentNode object parsed with gql
    ],
  });

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
        size="lg"
      >
        <p className="text-lg text-center">Create a poll</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            createPoll({
              variables: {
                seat: e.target.seat.value,
                intro: e.target.intro.value,
                beginDate: e.target.begindate.value,
                endDate: e.target.enddate.value,
              },
            });

            setOpenedCreate(false);
          }}
        >
          <label htmlFor="seat" className="block mb-4">
            <span className="text-gray-700">
              Seat<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="seat"
              placeholder="e.g. Club president"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="intro" className="block mb-4">
            <span className="text-gray-700">
              Short intro about this election
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <textarea
              cols="30"
              rows="10"
              name="intro"
              placeholder="About this poll"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200
              border-gray-300 focus:border-indigo-300 focus:ring-indigo-200
              focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            ></textarea>
          </label>
          <label htmlFor="begindate" className="block mb-4">
            <span className="text-gray-700">
              Begin date<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="date"
              name="begindate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="enddate" className="block mb-4">
            <span className="text-gray-700">
              End date<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="date"
              name="enddate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <br />
          <button
            type="submit"
            className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePoll;
