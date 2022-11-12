import { ThemeIcon, Tooltip } from "@mantine/core";
import { IconEye, IconArchive, IconFileAnalytics } from "@tabler/icons";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

import PollView from "./Poll-modals/PollView";
import Ballot from "./Poll-modals/Ballot";
import loader from "../../assets/Loading-Image/256x256.gif";

const GET_MY_POLLS = gql`
  query GetMyPolls($id: String!) {
    voterPolls(id: $id) {
      id
      seat
      open
      intro
      beginDate
      endDate
      candidateSet {
        id
        firstName
        lastName
        email
        bio
      }
    }
  }
`;

const VoterPolls = ({ organizerID }) => {
  const [openedPoll, setOpenedPoll] = useState(false);
  const [openedBallot, setOpenedBallot] = useState(false);

  const [pollData, setPollData] = useState({});

  const { loading, error, data } = useQuery(GET_MY_POLLS, {
    variables: { id: organizerID },
  });

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return (
    <>
      <div className="h-full w-full">
        <div className="my-20">
          <img src={loader} className="mx-auto my-36" alt="loader" />
        </div>
      </div>
    </>
  );
  if (error) return `Fetching error! ${error.message}`;

  return (
    <div>
      {/* body */}
      <div className="h-full py-4 px-20">
        {data.voterPolls.length === 0 ? (
          <div className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-lg">
            <h1 className="text-4xl text-center mb-6">
              You have not created any polls yet.
            </h1>
            <p className="text-lg text-center text-zinc-400">
              click on the create button at the bottom right end of your console
              to create a poll.
            </p>
          </div>
        ) : (
          <div>
            {data.voterPolls.map((poll, index) => {
              const list = (
                <>
                  <div
                    className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-md hover:shadow-lg flex items-center justify-between hover:scale-105 ease-in-out duration-200"
                    key={index}
                  >
                    <div>
                      <h1 className="text-xl">
                        <span className="font-semibold">{poll.seat}</span>
                      </h1>
                    </div>
                    <div className="flex items-center">
                      <Tooltip label="view poll" color="dark" withArrow>
                        <ThemeIcon
                          variant="outline"
                          color="blue"
                          radius="md"
                          size="lg"
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            setOpenedPoll(true);

                            setPollData(poll);
                          }}
                        >
                          <IconEye />
                        </ThemeIcon>
                      </Tooltip>

                      {poll.open ? (
                        <Tooltip label="vote on poll" color="dark" withArrow>
                          <ThemeIcon
                            variant="outline"
                            color="yellow"
                            radius="md"
                            size="lg"
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              setOpenedBallot(true);

                              setPollData(poll);
                            }}
                          >
                            <IconArchive />
                          </ThemeIcon>
                        </Tooltip>
                      ) : (
                        <div></div>
                      )}
                      <Tooltip label="view results" color="dark" withArrow>
                        <ThemeIcon
                          variant="outline"
                          color="green"
                          radius="md"
                          size="lg"
                          className="cursor-pointer mx-1"
                        >
                          <Link to={`/app/results/${poll.id}`} target="_blank">
                            <IconFileAnalytics />
                          </Link>
                        </ThemeIcon>
                      </Tooltip>
                      {poll.open ? (
                        <span className="mx-1 py-1 px-2 bg-emerald-300 rounded-md">
                          Status: Open
                        </span>
                      ) : (
                        <span className="mx-1 py-1 px-2 bg-yellow-300 rounded-md">
                          Status: Closed
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              return list;
            })}
          </div>
        )}

        {/* view poll modal */}
        <PollView
          openedPoll={openedPoll}
          setOpenedPoll={setOpenedPoll}
          pollData={pollData}
        />
        {/* view poll modal */}

        {/* vote on poll modal */}
        <Ballot
          openedBallot={openedBallot}
          setOpenedBallot={setOpenedBallot}
          pollData={pollData}
        />
        {/* vote on poll modal */}
      </div>
      {/* body */}
    </div>
  );
};

export default VoterPolls;
