import { gql, useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";

import CandidateAvatar from "./Candidate-modals/CandidateAvatar";
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
      <div className="h-full py-4 px-20">
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
          <Carousel
            slideSize="70%"
            height={230}
            slideGap="md"
            controlsOffset="xl"
            loop
            withIndicators
            className="my-36"
          >
            {data.organizerCandidates.map((candidate, index) => {
              const list = (
                <>
                  <div
                    className="w-56 h-full mx-2 bg-slate-100 rounded-lg shadow-lg border border-gray-300 cursor-pointer"
                    key={index}
                    onClick={() => {
                      setCandidateData(candidate);

                      setViewCandidate(true);
                    }}
                  >
                    <CandidateAvatar CandidateID={candidate.id} />
                    <div className="m-1 p-2">
                      <p className="text-lg mb-4 flex">
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
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>{" "}
                        <span className="ml-2">
                          {candidate.firstName} {candidate.lastName}
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              );

              return list;
            })}
          </Carousel>
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
      {/* edit candidate modal */}
    </div>
  );
};

export default OrganizerCandidates;
