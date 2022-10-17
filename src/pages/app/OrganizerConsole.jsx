import { Tabs, Drawer, useMantineTheme } from "@mantine/core";
import {
  IconLicense,
  IconUsers,
  IconUserCircle,
  IconPackage,
} from "@tabler/icons";
import { useState } from "react";
import OrganizerCandidates from "../../components/Organizer-console/OrganizerCandidates";
import OrganizerPolls from "../../components/Organizer-console/OrganizerPolls";
import OrganizerProfile from "../../components/Organizer-console/OrganizerProfile";
import OrganizerRules from "../../components/Organizer-console/OrganizerRules";
import PageTitle from "../../pageTitle";

const OrganizerConsole = () => {
  PageTitle("Organizer console");

  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <div>
      <Tabs
        color="teal"
        variant="pills"
        orientation="vertical"
        defaultValue="rules"
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
              value="rules"
              icon={<IconLicense size={15} />}
              onClick={() => setOpened(false)}
            >
              Rules
            </Tabs.Tab>
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
          </Tabs.List>
        </Drawer>

        <Tabs.Panel value="rules">
          <OrganizerRules opened={opened} setOpened={setOpened} />
        </Tabs.Panel>

        <Tabs.Panel value="polls">
          <OrganizerPolls opened={opened} setOpened={setOpened} />
        </Tabs.Panel>

        <Tabs.Panel value="candidates">
          <OrganizerCandidates opened={opened} setOpened={setOpened} />
        </Tabs.Panel>

        <Tabs.Panel value="profile">
          <OrganizerProfile opened={opened} setOpened={setOpened} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default OrganizerConsole;
