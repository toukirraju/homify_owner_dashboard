import { useDispatch, useSelector } from "react-redux";
import { filterByFloor } from "../../../../redux/features/filter/filterSlice";

const FloorSelect = ({ data }) => {
  const dispatch = useDispatch();
  const filteredFloor = useSelector((state) => state.filter.filterByFloor);

  const uniqueFloors = new Set();

  if (data) {
    data.forEach((item) => {
      if (
        item.apartment !== null &&
        item.apartment.apartmentDetails.apartment_number !== "" &&
        item.apartment.apartmentDetails.roomNumber !== ""
      ) {
        uniqueFloors.add(item.apartment.apartmentDetails.floor);
      }
    });
  }

  return (
    <select
      onChange={(e) => dispatch(filterByFloor(e.target.value))}
      value={filteredFloor}
      className="col-span-2 my-2 dark:bg-slate-800 dark:text-gray-400"
    >
      <option value="" hidden>
        Floor
      </option>
      {[...uniqueFloors]
        .sort((a, b) => a - b)
        .map((floor, index) => (
          <option key={index} value={floor}>
            Floor: {floor}
          </option>
        ))}
    </select>
  );
};

export default FloorSelect;
