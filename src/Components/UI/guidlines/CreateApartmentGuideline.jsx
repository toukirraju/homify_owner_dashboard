import createApartmentGif from "../../../assets/createApartment.gif";
const CreateApartmentGuideline = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 dark:text-gray-300">
      <h4 className="text-lg font-bold">No apartment found</h4>
      <span className=" font-bold">Please create apartment first</span>
      <div className="guidline" style={{ textAlign: "center" }}>
        <img src={createApartmentGif} alt="" />
        <h5 className="uppercase">Creating apartment</h5>
      </div>
    </div>
  );
};

export default CreateApartmentGuideline;
