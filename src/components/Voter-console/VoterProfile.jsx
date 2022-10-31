import { gql, useQuery } from "@apollo/client";

import VoterOrganizerImage from "../Organizer-console/Profile-modals/VoterOrganizerImage";

import VoterImage from "./Profile-modals/VoterImage";

const MY_ACCOUNT = gql`
  query MyAccount {
    myVoterAccount {
      id
      user {
        username
        firstName
        lastName
        email
      }
      country
      workspace {
        id
        name
        organizer {
          id
          phone
          user {
            username
            firstName
            lastName
            email
          }
        }
      }
    }
  }
`;

const VoterProfile = () => {
  const { loading, error, data } = useQuery(MY_ACCOUNT);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  const voterData = data.myVoterAccount;
  const workspaceData = data.myVoterAccount.workspace;

  return (
    <div>
      {/* body */}
      <div className="h-full py-4 px-20">
        <div className="p-2 flex justify-between mb-4">
          <div className="rounded-md border w-2/4 shadow-md h-full my-4">
            <VoterImage />
          </div>
          <div className="py-4 px-8">
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Username</p>
              <p className="text-2xl font-semibold text-gray-900">
                {voterData.user.username}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">
                First name
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {voterData.user.firstName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Last name</p>
              <p className="text-2xl font-semibold text-gray-900">
                {voterData.user.lastName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Email</p>
              <p className="text-2xl font-semibold text-gray-900">
                {voterData.user.email}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Country</p>
              <p className="text-2xl font-semibold text-gray-900">
                {voterData.country}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Workspace</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.name}
              </p>
            </div>
          </div>
        </div>

        <hr className="mb-8" />

        <h3 className="text-2xl text-center mb-8">
          Your workspace organizer's details
        </h3>
        <div className="p-2 flex justify-between mb-4">
          <div className="rounded-md border w-2/4 shadow-md h-full my-4">
            <VoterOrganizerImage organizerID={workspaceData.organizer.id} />
          </div>
          <div className="py-4 px-4">
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Username</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.organizer.user.username}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">
                First name
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.organizer.user.firstName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Last name</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.organizer.user.lastName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Phone</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.organizer.phone}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Email</p>
              <p className="text-2xl font-semibold text-gray-900">
                {workspaceData.organizer.user.email}
              </p>
            </div>
          </div>
        </div>

        <hr className="mt-16 mb-4" />
      </div>
      {/* body */}
    </div>
  );
};

export default VoterProfile;
