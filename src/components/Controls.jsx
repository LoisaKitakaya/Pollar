import { Burger, Menu, Text, Avatar, Kbd } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons";

const Controls = ({ opened, setOpened, myIcon }) => {
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <div className="flex items-center justify-between py-1 px-16 bg-slate-100 shadow-lg sticky top-0 w-full">
      <a href="/" className="flex items-center">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665759533/documents/logos/logo_pollar_bird_resize_zfvonv.png"
          alt="logo"
        />
        <h1 className="text-3xl ml-2 header-font text-yellow-900 font-semibold pt-1">
          Pollar
        </h1>
      </a>
      <div className="flex items-center">
        {myIcon ? (
          <Avatar
            src={myIcon.image}
            alt={myIcon.user.firstName}
            color="blue"
            radius="xl"
            className="cursor-pointer mx-4"
          />
        ) : (
          <Avatar color="blue" radius="xl" className="cursor-pointer mx-4" />
        )}
        <Menu
          shadow="md"
          width={200}
          trigger="hover"
          openDelay={100}
          closeDelay={100}
          withArrow
        >
          <Menu.Target>
            <span className="mx-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Console</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
                </Text>
              }
            >
              Search
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Account</Menu.Label>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
          className="mx-4"
        />
      </div>
    </div>
  );
};

export default Controls;
