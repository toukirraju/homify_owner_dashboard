import { useMediaQuery } from "@mantine/hooks";
import createRenterGif from "../../../assets/createRenter.gif";
import findRenterGif from "../../../assets/findRenter.gif";
const RenterAddingGuideline = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="flex flex-col items-center justify-center gap-2 dark:text-gray-300">
      <h4 className="text-lg font-bold">No renter found</h4>
      <span className=" font-bold">Please create or find the renter first</span>
      <div className="guidline" style={{ textAlign: "center" }}>
        <img src={createRenterGif} alt="" />
        <h5 className="uppercase">Renter creating</h5>
      </div>
      <div
        className="guidline"
        style={{ textAlign: "center", padding: "40px 0" }}
      >
        <img src={findRenterGif} alt="" />
        <h5 className="uppercase">Renter finding</h5>
      </div>
    </div>
  );
};

export default RenterAddingGuideline;
