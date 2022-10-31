import { Tabs, Drawer, useMantineTheme } from "@mantine/core";
import {
  IconLicense,
  IconUsers,
  IconUserCircle,
  IconPackage,
} from "@tabler/icons";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Controls from "../../components/OrganizerControls";
import OrganizerCandidates from "../../components/Organizer-console/OrganizerCandidates";
import OrganizerPolls from "../../components/Organizer-console/OrganizerPolls";
import OrganizerProfile from "../../components/Organizer-console/OrganizerProfile";
import OrganizerRules from "../../components/Organizer-console/OrganizerRules";
import PageTitle from "../../pageTitle";

const CHECK_MY_ACCOUNT = gql`
  query organizerCheck {
    myOrganizerAccount {
      user {
        firstName
        lastName
        email
        isActive
      }
    }
  }
`;

const OrganizerConsole = () => {
  PageTitle("Organizer console");

  const [opened, setOpened] = useState(false);

  const { loading, error, data } = useQuery(CHECK_MY_ACCOUNT);

  const theme = useMantineTheme();

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

      <Tabs
        color="teal"
        variant="pills"
        orientation="vertical"
        defaultValue="polls"
        className="h-screen"
      >
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Console menu"
          padding="sm"
          size="sm"
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          {/* Drawer content */}
          <Tabs.List>
            <Tabs.Tab
              value="polls"
              icon={<IconPackage size={15} />}
              onClick={() => setOpened(false)}
            >
              Polls
            </Tabs.Tab>
            <Tabs.Tab
              value="candidates"
              icon={<IconUsers size={15} />}
              onClick={() => setOpened(false)}
            >
              Candidates
            </Tabs.Tab>
            <Tabs.Tab
              value="profile"
              icon={<IconUserCircle size={15} />}
              onClick={() => setOpened(false)}
            >
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              value="rules"
              icon={<IconLicense size={15} />}
              onClick={() => setOpened(false)}
            >
              Rules
            </Tabs.Tab>
          </Tabs.List>
        </Drawer>

        <Tabs.Panel value="rules">
          <OrganizerRules />
        </Tabs.Panel>

        <Tabs.Panel value="polls">
          <OrganizerPolls />
        </Tabs.Panel>

        <Tabs.Panel value="candidates">
          <OrganizerCandidates />
        </Tabs.Panel>

        <Tabs.Panel value="profile">
          <OrganizerProfile />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default OrganizerConsole;
