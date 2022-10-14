const Intro = () => {
  return (
    <div className="pt-2">
      <div className="px-16 py-10 flex items-center w-fit m-auto">
        <div className="px-2">
          <h1 className="text-5xl">Integrity based online voting app</h1>
          <br />
          <p className="text-lg">
            Conduct remote elections and voting without reputation or legal
            risks.
          </p>
          <br />
          <a
            href="/"
            className="rounded-md shadow-md border-black py-2 px-4 bg-emerald-300 hover:bg-emerald-400"
          >
            Contact us
          </a>
        </div>
        <img
          src="https://res.cloudinary.com/dit0fii18/image/upload/v1665759533/documents/logos/logo_resize_vhwcgm.png"
          alt="intro"
        />
      </div>
      <div className="bg-slate-100">
        <div className="flex items-center justify-around w-fit m-auto p-10">
          <h1 className="text-5xl w-1/4">Conduct elections without risk</h1>
          <p className="text-lg w-2/4">
            Conduct online elections with complete confidence in their
            reliability. Polys is built by blockchain voting experts. Our first
            pilot took place in 2016 and since then hundreds of organizations
            around the world have held elections with our help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
