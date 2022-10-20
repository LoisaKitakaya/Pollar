import { Modal, useMantineTheme } from "@mantine/core";
import { gql, useMutation } from "@apollo/client";

const REGISTER_CANDIDATE = gql`
  mutation AddCandidate(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $country: String!
    $bio: String!
  ) {
    registerCandidate(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      country: $country
      bio: $bio
    ) {
      candidate {
        id
        firstName
        lastName
        email
        country
        bio
        image
        poll {
          seat
          intro
          beginDate
          endDate
        }
      }
    }
  }
`;

const RegisterCandidate = ({
  registerCandidateView,
  setRegisterCandidateView,
  allPolls,
}) => {
  const theme = useMantineTheme();

  const [registerCandidate, { data, loading, error }] =
    useMutation(REGISTER_CANDIDATE);

  if (data) {
    console.log(data);
    console.log("Account creation success.You can now log in.");

    window.location.reload(false);
  }
  if (loading) return "Submitting...";
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
        opened={registerCandidateView}
        onClose={() => setRegisterCandidateView(false)}
        withCloseButton={false}
        size="lg"
      >
        <p className="text-lg text-center">Register candidate to a poll</p>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();

            registerCandidate({
              variables: {
                id: e.target.pollid.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                email: e.target.email.value,
                country: e.target.country.value,
                bio: e.target.bio.value,
              },
            });

            setRegisterCandidateView(false);
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
          <label htmlFor="country" className="block mb-4">
            <span className="text-gray-700">
              Poll<span className="text-red-700 text-3xl">*</span>
            </span>
            <select
              name="pollid"
              placeholder="e.g. Kenya"
              required
              className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
            >
              <option disabled selected>
                Select poll candidate will take part in
              </option>
              {allPolls.map((poll, index) => {
                const list = (
                  <>
                    <option value={poll.id} key={index}>
                      {poll.seat}
                    </option>
                  </>
                );

                return list;
              })}
            </select>
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
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default RegisterCandidate;
