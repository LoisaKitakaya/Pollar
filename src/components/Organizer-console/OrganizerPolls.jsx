import { ThemeIcon, Tooltip } from "@mantine/core";
import { IconEye, IconEdit, IconTrash, IconLockAccess } from "@tabler/icons";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import ViewPoll from "./Poll-modals/ViewPoll";
import CreatePoll from "./Poll-modals/CreatePoll";
import EditPoll from "./Poll-modals/EditPoll";
import RegisterCandidate from "./Candidate-modals/RegisterCandidate";

const GET_MYPOLLS = gql`
  query GetMyPolls {
    allPolls {
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
        image
      }
    }
  }
`;

const OrganizerPolls = ({ opened, setOpened }) => {
  const [openedView, setOpenedView] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [registerCandidate, setRegisterCandidate] = useState(false);

  const [pollData, setPollData] = useState({});

  const { loading, error, data } = useQuery(GET_MYPOLLS);

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
        {data.allPolls.length === 0 ? (
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
            {data.allPolls.map((poll, index) => {
              const list = (
                <>
                  <div
                    className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-lg flex items-center justify-between"
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
                            setPollData(poll);

                            setOpenedView(true);
                          }}
                        >
                          <IconEye />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label="edit poll" color="dark" withArrow>
                        <ThemeIcon
                          variant="outline"
                          color="blue"
                          radius="md"
                          size="lg"
                          className="cursor-pointer mx-1"
                          onClick={() => setOpenedEdit(true)}
                        >
                          <IconEdit />
                        </ThemeIcon>
                      </Tooltip>
                      {poll.open ? (
                        <Tooltip label="close poll" color="dark" withArrow>
                          <ThemeIcon
                            variant="outline"
                            color="orange"
                            radius="md"
                            size="lg"
                            className="cursor-pointer mx-1"
                          >
                            <IconLockAccess />
                          </ThemeIcon>
                        </Tooltip>
                      ) : (
                        <div></div>
                      )}
                      <Tooltip label="delete poll" color="dark" withArrow>
                        <ThemeIcon
                          variant="outline"
                          color="red"
                          radius="md"
                          size="lg"
                          className="cursor-pointer mx-1"
                        >
                          <IconTrash />
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
        <ViewPoll
          openedView={openedView}
          setOpenedView={setOpenedView}
          pollData={pollData}
        />
        {/* view poll modal */}

        {/* create poll modal */}
        <CreatePoll
          openedCreate={openedCreate}
          setOpenedCreate={setOpenedCreate}
        />
        {/* create poll modal */}

        {/* edit poll modal */}
        <EditPoll openedEdit={openedEdit} setOpenedEdit={setOpenedEdit} />
        {/* edit poll modal */}

        {/* register candidate modal */}
        <RegisterCandidate
          registerCandidate={registerCandidate}
          setRegisterCandidate={setRegisterCandidate}
        />
        {/* register candidate modal */}

        {/* create poll button */}
        <Tooltip label="create poll" color="dark" position="left" withArrow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 fixed bottom-24 rounded-md bg-zinc-300 right-16 shadow-lg cursor-pointer p-2"
            onClick={() => setOpenedCreate(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Tooltip>
        {/* create poll button */}

        {/* register candidate button */}
        <Tooltip
          label="register candidate"
          color="dark"
          position="left"
          withArrow
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 fixed bottom-10 rounded-md bg-zinc-300 right-16 shadow-lg cursor-pointer p-2"
            onClick={() => setRegisterCandidate(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </Tooltip>
        {/* register candidate button */}
      </div>
      {/* body */}
    </div>
  );
};

export default OrganizerPolls;
