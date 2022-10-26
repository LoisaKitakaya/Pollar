import { gql, useQuery } from "@apollo/client";
import { Menu } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useState } from "react";

import CandidateAvatar from "./Candidate-modals/CandidateAvatar";
import DeleteCandidate from "./Candidate-modals/DeleteCandidate";
import EditCandidate from "./Candidate-modals/EditCandidate";
import ViewCandidate from "./Candidate-modals/ViewCandidate";

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

const OrganizerCandidates = ({ opened, setOpened }) => {
  const [viewCandidate, setViewCandidate] = useState(false);
  const [editCandidate, setEditCandidate] = useState(false);

  const [candidateData, setCandidateData] = useState({});

  const { loading, error, data } = useQuery(GET_MY_CANDIDATES);

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      {/* body */}
      <div className="h-full py-4 px-20 w-10/12 m-auto">
        {data.organizerCandidates.length === 0 ? (
          <div className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-lg">
            <h1 className="text-4xl text-center mb-6">
              You have not registered any candidates yet.
            </h1>
            <p className="text-lg text-center text-zinc-400">
              Go to the polls tab, and click the register candidate button to
              register a candidate to a poll.
            </p>
          </div>
        ) : (
          <div className="my-8 flex flex-wrap">
            {data.organizerCandidates.map((candidate, index) => {
              const list = (
                <>
                  <div
                    className="w-56 h-full my-4 mx-2 bg-slate-100 rounded-lg border border-gray-300 cursor-pointer shadow-md hover:shadow-lg hover:scale-105 ease-in-out duration-200"
                    key={index}
                    onDoubleClick={() => {
                      setCandidateData(candidate);

                      setViewCandidate(true);
                    }}
                  >
                    <CandidateAvatar CandidateID={candidate.id} />
                    <div className="m-1 p-2 flex justify-between">
                      <p className="text-lg">
                        {candidate.firstName} {candidate.lastName}
                      </p>
                      <Menu
                        shadow="md"
                        width={100}
                        position="top"
                        offset={-5}
                        trigger="hover"
                        openDelay={100}
                        closeDelay={400}
                      >
                        <Menu.Target>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            icon={<IconEdit size={14} />}
                            onClick={() => {
                              setCandidateData(candidate);

                              setEditCandidate(true);
                            }}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item color="red" icon={<IconTrash size={14} />}>
                            <DeleteCandidate candidateData={candidate} />
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  </div>
                </>
              );

              return list;
            })}
          </div>
        )}
      </div>
      {/* body */}

      {/* view candidate modal */}
      <ViewCandidate
        candidateData={candidateData}
        viewCandidate={viewCandidate}
        setViewCandidate={setViewCandidate}
      />
      {/* view candidate modal */}

      {/* edit candidate modal */}
      <EditCandidate
        candidateData={candidateData}
        editCandidate={editCandidate}
        setEditCandidate={setEditCandidate}
      />
      {/* edit candidate modal */}
    </div>
  );
};

export default OrganizerCandidates;
