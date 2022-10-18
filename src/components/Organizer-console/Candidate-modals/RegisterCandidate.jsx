import { Modal, useMantineTheme } from "@mantine/core";

const RegisterCandidate = ({ registerCandidate, setRegisterCandidate }) => {
  const theme = useMantineTheme();

  return (
    <div>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={registerCandidate}
        onClose={() => setRegisterCandidate(false)}
        withCloseButton={false}
        size="xl"
      >
        <p className="text-lg text-center">Register candidate modal</p>
      </Modal>
    </div>
  );
};

export default RegisterCandidate;
