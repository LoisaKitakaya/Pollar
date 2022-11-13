import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";
import { Notification } from "@mantine/core";

const UPDATE_CANDIDATE = gql`
  mutation UpdateCandidate(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $country: String!
    $bio: String!
  ) {
    editCandidate(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      country: $country
      bio: $bio
    ) {
      candidate {
        firstName
        lastName
        email
        country
        bio
      }
    }
  }
`;

const GET_MY_CANDIDATES = gql`
  query GetMyCandidates {
    organizerCandidates {
      id
      firstName
      lastName
      email
      country
      bio
      poll {
        seat
        beginDate
        endDate
        workspace {
          name
          voterLimit
          pollLimit
        }
      }
    }
  }
`;

const EditCandidate = ({
  editCandidateModal,
  setEditCandidateModal,
  candidateData,
}) => {
  const theme = useMantineTheme();

  const [editCandidate, { data, loading, error }] = useMutation(
    UPDATE_CANDIDATE,
    {
      refetchQueries: [
        { query: GET_MY_CANDIDATES }, // DocumentNode object parsed with gql
      ],
    }
  );

  if (data) {
    console.log(data);
    console.log("Account update success.");
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
        opened={editCandidateModal}
        onClose={() => setEditCandidateModal(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Edit candidate details</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            editCandidate({
              variables: {
                id: candidateData.id,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                email: e.target.email.value,
                country: e.target.country.value,
                bio: e.target.bio.value,
              },
            });

            setEditCandidateModal(false);
          }}
        >
          <label htmlFor="firstname" className="block mb-4">
            <span className="text-gray-700">
              First name<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="firstname"
              placeholder="e.g. John"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="lastname" className="block mb-4">
            <span className="text-gray-700">
              Last name<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="lastname"
              placeholder="e.g. Doe"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="email" className="block mb-4">
            <span className="text-gray-700">
              Email<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="email"
              name="email"
              placeholder="e.g. johndoe54@gmail.com"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="country" className="block mb-4">
            <span className="text-gray-700">
              Country<span className="text-red-700 text-3xl">*</span>
            </span>
            <input
              type="text"
              name="country"
              placeholder="e.g. Kenya"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            />
          </label>
          <label htmlFor="bio" className="block mb-4">
            <span className="text-gray-700">
              Bio
              <span className="text-red-700 text-3xl">*</span>
            </span>
            <textarea
              cols="30"
              rows="10"
              name="bio"
              placeholder="Short intro about this candidate"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200
              border-gray-300 focus:border-indigo-300 focus:ring-indigo-200
              focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            ></textarea>
          </label>
          <br />
          <button
            type="submit"
            className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditCandidate;
