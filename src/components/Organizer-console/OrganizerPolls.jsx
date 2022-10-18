import {
  ThemeIcon,
  Tooltip,
  Modal,
  useMantineTheme,
  Badge,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  IconRowInsertTop,
  IconEye,
  IconEdit,
  IconTrash,
  IconLockAccess,
} from "@tabler/icons";
import { gql, useQuery } from "@apollo/client";

import Controls from "../Controls";
import { useState } from "react";

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
  const theme = useMantineTheme();

  const [openedView, setOpenedView] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);

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
      {/* controls */}
      <Controls opened={opened} setOpened={setOpened} />
      {/* controls */}

      {/* body */}
      <div className="h-full py-4 px-20">
        {data ? (
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
        ) : (
          <div className="w-3/4 mx-auto my-8 py-6 px-4 bg-slate-100 rounded-md shadow-lg">
            <h1 className="text-4xl text-center mb-6">
              You have not created any polls yet.
            </h1>
            <p className="text-lg text-center text-zinc-400">
              click on the create button at the bottom right end of your console
              to create a poll.
            </p>
          </div>
        )}

        {/* view poll modal */}
        <Modal
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={openedView}
          onClose={() => setOpenedView(false)}
          withCloseButton={false}
          size="70%"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-3xl font-light pl-1">Poll details</p>
            {pollData.open ? (
              <Badge color="teal" size="lg" variant="filled">
                Status: Open{" "}
                <span className="font-light text-md">
                  {"(elections can be held on this poll)"}
                </span>
              </Badge>
            ) : (
              <Badge color="yellow" size="lg" variant="filled">
                Status: Closed{" "}
                <span className="font-light text-md">
                  {"(elections cannot be held on this poll)"}
                </span>
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg border py-2 px-4">
              <p className="font-light text-lg text-gray-600 mb-2">
                Contended position
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {pollData.seat}
              </p>
            </div>
            <div className="flex items-center">
              <div className="rounded-lg border py-2 px-4 mx-2">
                <p className="font-light text-lg text-gray-600 mb-2">
                  Begins on
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pollData.beginDate}
                </p>
              </div>
              <div className="rounded-lg border py-2 px-4 mx-2">
                <p className="font-light text-lg text-gray-600 mb-2">Ends on</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pollData.endDate}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border py-2 px-4 mb-4">
            <p className="font-light text-lg text-gray-600 mb-2">Short intro about this election</p>
            <p className="font-semibold text-gray-900">{pollData.intro}</p>
          </div>
          <hr className="mb-4" />
          <div className="rounded-lg border py-2 px-4 mb-4">
            <p className="font-light text-lg text-gray-600 mb-2">
              Contending candidates
            </p>
            <Carousel
              align="start"
              slideSize="100%"
              height={475}
              slideGap="xl"
              loop
            >
              <div className="rounded-lg border border-gray-300 shadow-lg m-2 w-fit h-fit cursor-pointer">
                <img
                  className="w-full h-full rounded-t-lg"
                  src="https://images.pexels.com/photos/13816113/pexels-photo-13816113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="m-1 py-1 px-2">
                  <p>Name: Some Name</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 shadow-lg m-2 w-fit h-fit cursor-pointer">
                <img
                  className="w-full h-full rounded-t-lg"
                  src="https://images.pexels.com/photos/13866617/pexels-photo-13866617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="m-1 py-1 px-2">
                  <p>Name: Some Name</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 shadow-lg m-2 w-fit h-fit cursor-pointer">
                <img
                  className="w-full h-full rounded-t-lg"
                  src="https://images.pexels.com/photos/13719224/pexels-photo-13719224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="m-1 py-1 px-2">
                  <p>Name: Some Name</p>
                </div>
              </div>
            </Carousel>
          </div>
        </Modal>
        {/* view poll modal */}

        {/* create poll modal */}
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
          size="xl"
        >
          <p className="text-lg text-center">Create poll modal</p>
        </Modal>
        {/* create poll modal */}

        {/* edit poll modal */}
        <Modal
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={openedEdit}
          onClose={() => setOpenedEdit(false)}
          withCloseButton={false}
          size="xl"
        >
          <p className="text-lg text-center">Edit poll modal</p>
        </Modal>
        {/* edit poll modal */}

        {/* create poll button */}
        <Tooltip label="create poll" color="dark" position="left" withArrow>
          <ThemeIcon
            variant="light"
            color="dark"
            radius="md"
            size="xl"
            className="fixed bottom-10 right-16 shadow-lg cursor-pointer"
            onClick={() => setOpenedCreate(true)}
          >
            <IconRowInsertTop size={"xl"} />
          </ThemeIcon>
        </Tooltip>
        {/* create poll button */}
      </div>
      {/* body */}
    </div>
  );
};

export default OrganizerPolls;
