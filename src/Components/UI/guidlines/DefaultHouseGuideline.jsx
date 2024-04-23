import createHomeImage from "../../../assets/create house .gif";
import setDefaultGif from "../../../assets/make default.gif";
const DefaultHouseGuideline = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 dark:text-gray-300">
      <h4 className="text-lg font-bold">Default house not found</h4>
      <span className=" font-bold">
        Please create a house then select it as a default house from profile
        section
      </span>

      <div className="guidline">
        <img src={createHomeImage} alt="" />
      </div>
      <h5 className="uppercase">create house</h5>

      <div className="guidline">
        <img src={setDefaultGif} alt="" />
      </div>
      <h5 className="uppercase">set default house</h5>
    </div>
  );
};

export default DefaultHouseGuideline;
