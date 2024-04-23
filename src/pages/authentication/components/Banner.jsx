const Banner = () => {
  return (
    <div className="absolute top-10 md:top-0">
      <div className="mt-5 flex flex-col items-center justify-center gap-3 rounded-md border px-3 py-2 text-justify text-gray-600 shadow-md dark:text-slate-400  md:flex-row">
        <span>Are you want to check demo version ?</span>
        <span>Sign in with given credentials -</span>

        <ul className="flex justify-between gap-2 md:list-disc">
          <li className="text-gray-500">
            <b>username:</b> dashboard
          </li>
          <li className="text-gray-500">
            <b>password:</b> 12345
          </li>
        </ul>
        {/* <button
          onClick={() => {
            window.open("https://dashboard.h0mify.com", "_blank");
          }}
          className="my-2 flex items-center  justify-center rounded-md bg-teal-600 px-2 py-1 font-bold text-gray-300 shadow-md shadow-gray-500 drop-shadow-md duration-300 hover:bg-teal-700"
        >
          Go for Dashboard <UilAngleRightB />
        </button> */}
      </div>
    </div>
  );
};

export default Banner;
