import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Notification } from "@mantine/core";

const REGISTER_ORGANIZER = gql`
  mutation RegisterOrganizer(
    $phone: String!
    $country: String!
    $workspace: String!
  ) {
    registerOrganizer(phone: $phone, country: $country, workspace: $workspace) {
      organizer {
        user {
          firstName
          lastName
          email
          isActive
        }
        phone
        country
        workspaceSet {
          name
          pollLimit
          voterLimit
        }
      }
    }
  }
`;

const RegisterOrganizer = () => {
  const [registerOrganizer, { data, loading, error }] =
    useMutation(REGISTER_ORGANIZER);

  const navigate = useNavigate();

  if (data) {
    console.log(data);
    console.log("Account registration success. Redirecting to console.");

    navigate("/app/organizer_console/");
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
    <div className="bg-zinc-100 rounded-lg shadow-md border p-4 w-3/4 m-auto">
      <form
        className="px-4"
        onSubmit={(e) => {
          e.preventDefault();

          registerOrganizer({
            variables: {
              phone: e.target.phone.value,
              country: e.target.country.value,
              workspace: e.target.workspace.value,
            },
          });
        }}
      >
        <label htmlFor="phone" className="block mb-4">
          <span className="text-gray-700">
            Phone<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="text"
            name="phone"
            placeholder="e.g. +254725131828"
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
        <label htmlFor="workspace" className="block mb-4">
          <span className="text-gray-700">
            Workspace<span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="text"
            name="workspace"
            placeholder="e.g. Medical society elections"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
          <br />
          <span className="text-gray-700 text-sm flex">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
            Workspace here refers the name of the collection which your
            elections/polls will be grouped into. This is also the name voters
            will use to access your elections/polls. A good format for your
            workspace name would be the name of the organization you represent{" "}
            {"(e.g. Medical Society)"} and the word 'elections' at the end{" "}
            {"(e.g. Medical Society Elections)"}
          </span>
        </label>
        <label htmlFor="agree" className="inline-flex items-center mb-4">
          <input
            type="checkbox"
            name="agree"
            required
            className="text-indigo-600 rounded shadow-sm border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring"
          />
          <span className="ml-2 text-gray-900">
            I agree to the{" "}
            <a href="/" className="text-blue-900 underline">
              Terms {"&"} conditions
            </a>
          </span>
        </label>
        <br />
        <button
          type="submit"
          className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterOrganizer;
