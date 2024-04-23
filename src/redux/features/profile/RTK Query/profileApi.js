import { apiSlice } from "../../../api/apiSlice";
import { updateProfile } from "../../auth/slice/authSlice";
import { setDefaultHouse } from "../slice/profileSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchHouses: builder.query({
      query: () => ({
        url: "/owner/house/all",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          const defaultHouse = data.find((house) => house.isDefault);
          dispatch(setDefaultHouse(defaultHouse));
        }
      },
      providesTags: ["AllHouses"],
    }),
    fetchManagers: builder.query({
      query: () => ({
        url: "/owner/manager/all",
        method: "GET",
      }),
      providesTags: ["AllManagers"],
    }),
    makeDefaultHouse: builder.mutation({
      query: (data) => ({
        url: `/owner/house/default/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user.defaultHomeID = args._id;
          localStorage.setItem("auth", JSON.stringify(auth));

          dispatch(updateProfile(auth.user));
        }
      },
      invalidatesTags: [
        "AllHouses",
        "AllManagers",
        "AllApartments",
        "AllRenters",
        "MonthlyBills",
        "TemporaryBills",
        "YarlyBills",
        "RenterActivity",
        "ChartData",
        "WidgetData",
        "AllPosts",
        "PostWidget",
      ],
    }),

    createHouse: builder.mutation({
      query: (data) => ({
        url: `/owner/house/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllHouses"],
    }),

    updateHouse: builder.mutation({
      query: (data) => ({
        url: `/owner/house/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          dispatch(
            apiSlice.util.updateQueryData("fetchHouses", undefined, (draft) => {
              const draftHouse = draft.find((house) => house._id == args._id);

              draftHouse.address_display_name = args.address_display_name;
              draftHouse.country = args.country;
              draftHouse.country_code = args.country_code;
              draftHouse.houseName = args.houseName;
              draftHouse.houseNo = args.houseNo;
              draftHouse.lat = args.lat;
              draftHouse.lon = args.lon;
              draftHouse.number_of_apartments = args.number_of_apartments;
              draftHouse.number_of_floors = args.number_of_floors;
              draftHouse.place_id = args.place_id;
              draftHouse.postCode = args.postCode;
              draftHouse.state = args.state;
              draftHouse.state_district = args.state_district;
              draftHouse.streetNo = args.streetNo;
            })
          );
        }
      },
    }),

    uploadHouseImage: builder.mutation({
      query: (data) => ({
        url: `/owner/house/image/upload/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData("fetchHouses", undefined, (draft) => {
              const newArray = draft.map((item) => {
                // eslint-disable-next-line eqeqeq
                if (item._id == data._id) {
                  return {
                    ...data,
                  };
                }
                return item;
              });
              return newArray;
            })
          );
        }
      },
    }),

    removeHouseImage: builder.mutation({
      query: (data) => ({
        url: `/owner/house/image/remove/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData("fetchHouses", undefined, (draft) => {
              const newArray = draft.map((item) => {
                // eslint-disable-next-line eqeqeq
                if (item._id == data._id) {
                  return {
                    ...data,
                  };
                }
                return item;
              });
              return newArray;
            })
          );
        }
      },
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/owner/personal/update`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = args;
          localStorage.setItem("auth", JSON.stringify(auth));
          dispatch(updateProfile(args));
        }
      },
    }),

    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `/owner/personal/update/image`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
          dispatch(updateProfile(data));
        }
      },
    }),

    removeProfileImage: builder.mutation({
      query: (data) => ({
        url: `/owner/personal/remove/image`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
          dispatch(updateProfile(data));
        }
      },
    }),

    assignRole: builder.mutation({
      query: (data) => ({
        url: `/owner/assign/manager/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllManagers"],
    }),
    removeManagerRole: builder.mutation({
      query: (id) => ({
        url: `/owner/remove/manager/${id}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchManagers",
              undefined,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const updatedManagers = draft.filter((item) => item._id != arg);
                return updatedManagers;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
    }),
  }),
});

export const {
  useFetchHousesQuery,
  useFetchManagersQuery,
  useMakeDefaultHouseMutation,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useUploadHouseImageMutation,
  useRemoveHouseImageMutation,
  useUpdateUserProfileMutation,
  useAssignRoleMutation,
  useRemoveManagerRoleMutation,
  useUpdateProfileImageMutation,
  useRemoveProfileImageMutation,
} = profileApi;
