import { gql, useQuery } from "@apollo/client";

import OrganizerImage from "./Profile-modals/OrganizerImage";
import loader from "../../assets/Loading-Image/256x256.gif";

const MY_ACCOUNT = gql`
  query MyAccount {
    myOrganizerAccount {
      id
      user {
        id
        username
        firstName
        lastName
        email
      }
      phone
      country
      paidStatus
      runningPackage
      workspaceSet {
        name
        voterLimit
        pollLimit
      }
    }
  }
`;

const OrganizerProfile = () => {
  const { loading, error, data } = useQuery(MY_ACCOUNT);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading)
    return (
      <>
        <div className="h-full w-full">
          <div className="my-20">
            <img src={loader} className="mx-auto my-36" alt="loader" />
          </div>
        </div>
      </>
    );
  if (error) return `Fetching error! ${error.message}`;

  const organizerData = data.myOrganizerAccount;
  const workspaceData = data.myOrganizerAccount.workspaceSet[0];

  return (
    <div>
      {/* body */}
      <div className="h-full py-4 px-20">
        <div className="p-2 flex justify-between mb-4">
          <OrganizerImage organizerID={data.myOrganizerAccount.id} />
          <div className="py-4 px-8">
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Username</p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.user.username}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">
                First name
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.user.firstName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Last name</p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.user.lastName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Email</p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.user.email}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Phone</p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.phone}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-light text-lg text-gray-600 mb-2">Country</p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.country}
              </p>
            </div>
          </div>
        </div>

        <hr className="mb-8" />

        <div className="mb-4">
          <h3 className="text-2xl text-center mb-16">Account details</h3>
          <div className="flex items-center justify-evenly">
            <div className="mx-2">
              <p className="font-light text-lg text-gray-600 mb-2 text-center">
                Workspace
              </p>
              <p className="text-2xl font-semibold text-gray-900 text-center">
                {workspaceData.name}
              </p>
            </div>
            <div className="mx-2">
              <p className="font-light text-lg text-gray-600 mb-2 text-center">
                Poll limit
              </p>
              <p className="text-2xl font-semibold text-gray-900 text-center">
                {workspaceData.pollLimit}
              </p>
            </div>
            <div className="mx-2">
              <p className="font-light text-lg text-gray-600 mb-2 text-center">
                Voter limit
              </p>
              <p className="text-2xl font-semibold text-gray-900 text-center">
                {workspaceData.voterLimit}
              </p>
            </div>
            <div className="mx-2">
              <p className="font-light text-lg text-gray-600 mb-2 text-center">
                Running package
              </p>
              <p className="text-2xl font-semibold text-gray-900 text-center">
                {organizerData.runningPackage}
              </p>
            </div>
            <div className="mx-2">
              <p className="font-light text-lg text-gray-600 mb-2 text-center">
                Paid account
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {organizerData.paidStatus === true ? (
                  <span className="text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 m-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="text-red-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 m-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                )}
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

export default OrganizerProfile;
