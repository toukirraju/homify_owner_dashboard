import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apartmnetApi } from "../../../../redux/features/apartment/RTK Query/apartmentApi";
import {
  renterApi,
  useAssignRenterMutation,
} from "../../../../redux/features/renter/RTK Query/renterApi";

const useAssign = ({
  apartmentData,
  apartmentPopUp,
  renterData,
  renterPopUp,
  setAssignModalOpened,
}) => {
  let loading = false;
  const [assignRenter, { isSuccess, isLoading }] = useAssignRenterMutation();
  const [selectedData, setSelectedData] = useState({
    apartment: "",
    renter: "",
  });

  //manually fetch apartments data
  const { data: fatchApartments = [], refetch: refetchApartments } =
    apartmnetApi.endpoints.fetchApartments.useQuery();
  //manually fetch renters data
  const { refetch: refetchRenters } =
    renterApi.endpoints.fetchRenters.useQuery();

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    let apartment = apartmentPopUp ? null : JSON.parse(selectedData.apartment);
    let renter = renterPopUp ? null : JSON.parse(selectedData.renter);

    const assignedData = {
      apartmentId: apartmentPopUp ? apartmentData._id : apartment._id,
      apartment_number: apartmentPopUp
        ? apartmentData.apartmentDetails.apartment_number
        : apartment.apartmentDetails.apartment_number,
      roomNumber: apartmentPopUp
        ? apartmentData.apartmentDetails.roomNumber
        : apartment.apartmentDetails.roomNumber,
      renterName: renterPopUp ? renterData.fullname : renter.fullname,
      renterId: renterPopUp ? renterData._id : renter._id,
    };

    // submit assign data
    assignRenter(assignedData);
  };
  useEffect(() => {
    if (isSuccess) {
      refetchApartments();
      refetchRenters();
      toast.success("successfully assigned");
      setAssignModalOpened(false);
      setSelectedData({
        apartment: "",
        renter: "",
      });
      loading = false;
    }
  }, [isSuccess]);

  loading = isLoading;

  return {
    loading,
    fatchApartments,
    selectedData,
    handleChange,
    onSubmit,
  };
};

export default useAssign;
