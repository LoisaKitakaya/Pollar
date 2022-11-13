import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";
import OrganizerAvatar from "./Controls/OrganizerAvatar";
import OrganizerSettings from "./Controls/OrganizerSettings";

const Controls = ({ opened, setOpened, organizerID }) => {
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <div className="flex items-center justify-between py-1 px-16 bg-slate-100 shadow-lg sticky top-0 w-full z-50">
      <Link to="/" className="flex items-center">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665759533/documents/logos/logo_pollar_bird_resize_zfvonv.png"
          alt="logo"
        />
        <h1 className="text-3xl ml-2 header-font text-yellow-900 font-semibold pt-1">
          Pollar
        </h1>
      </Link>
      <div className="flex items-center">
        <OrganizerAvatar organizerID={organizerID} />
        <OrganizerSettings organizerID={organizerID} />
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
