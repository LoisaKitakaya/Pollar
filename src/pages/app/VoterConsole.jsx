import { Tabs, Drawer, useMantineTheme } from "@mantine/core";
import { IconLicense, IconUserCircle, IconPackage } from "@tabler/icons";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import PageTitle from "../../pageTitle";
import VoterRules from "../../components/Voter-console/VoterRules";
import VoterPolls from "../../components/Voter-console/VoterPolls";
import VoterProfile from "../../components/Voter-console/VoterProfile";
import VoterControls from "../../components/VoterControls";

const CHECK_MY_ACCOUNT = gql`
  query voterCheck {
    myVoterAccount {
      user {
        firstName
        lastName
        email
        isActive
      }
      workspace {
        organizer {
          id
        }
      }
    }
  }
`;

const VoterConsole = () => {
  PageTitle("Voter console");

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
      <VoterControls opened={opened} setOpened={setOpened} />
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
          <VoterRules />
        </Tabs.Panel>

        <Tabs.Panel value="polls">
          <VoterPolls
            organizerID={data.myVoterAccount.workspace.organizer.id}
          />
        </Tabs.Panel>

        <Tabs.Panel value="profile">
          <VoterProfile />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default VoterConsole;
