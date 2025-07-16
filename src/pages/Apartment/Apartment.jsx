import { useQuery } from "@tanstack/react-query";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { axiosPublic } from "../../hooks/useAxios";
import { confirmAlert, errorAlert, successAlert } from "../../utils/alerts";
import LoadingState from "../../utils/LoadingState";
import RangeSlider from "../../components/RangeSlider.jsx/RangeSlider";
import ApartmentCard from "../../components/Cards/ApartmentCard";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router";

const Apartment = () => {
  const [fromRange, setFromRange] = useState(1215);
  const [toRange, setToRange] = useState(4900);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["apartment", "all", page],
    queryFn: async () => {
      const res = await axiosPublic.get("/apartment/all", {
        params: {
          page: page,
          limit: 6,
          fromRange: fromRange,
          toRange: toRange,
        },
      });
      console.log(res.data);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleFindByRange = () => {
    if (fromRange > toRange) {
      errorAlert("From range must be less than to range");
      return;
    }
    refetch();
  };

  const pages = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pages.push(i);
  }

  const handleSelectedApartment = async (apartment) => {
    try {
      if (!user) {
        navigate("/login");
      }

      const isConfirmed = await confirmAlert(
        "Do You Really Want To Book This Apartment?",
      );

      if (isConfirmed) {
        const res = await axiosPublic.post("/agreement/create", {
          apartment,
          user,
        });
        if (res.status === 201) {
          successAlert("Booking Successful");
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      if (error.status === 409) errorAlert("You already have a booking");
      else errorAlert(error.message);
    }
  };

  return (
    <div className="bg-teal-900">
      <div className="w-full h-40 "> </div>

      {/*  search by range  */}
      <div className="text-center lg:w-6/12 w-11/12 font-semibold items-start mx-auto bg-base-200 rounded-xl lg:p-8 p-4 flex flex-col gap-4">
        <h1 className="text-xl">Lets Find Your Home</h1>
        <div className="w-full">
          <RangeSlider
            setFromRange={setFromRange}
            setToRange={setToRange}
            fromRange={fromRange}
            toRange={toRange}
          />
        </div>

        <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-center gap-4">
          <input
            className="border-0 outline-0 cursor-pointer"
            value={`From: $${fromRange}`}
            readOnly
          />
          <input
            className="border-0 outline-0 cursor-pointer"
            value={`To: $${toRange}`}
            readOnly
          />
          <button className="btn" onClick={handleFindByRange}>
            {isFetching ? (
              <div>
                <span className="loading loading-spinner loading-sm"></span>{" "}
                Searching...
              </div>
            ) : (
              "Search Home"
            )}
          </button>
          <div>
            {data?.data && data?.total !== 20 ? (
              <button className="btn btn-ghost">
                {" "}
                Total result found: {data.total}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/*  search by range  */}

      <div className="text-center py-8 text-4xl text-white lg:pt-20">
        <h1>All Floors</h1>
      </div>
      <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-6 pb-24">
        {(isLoading || isFetching) && <LoadingState />}
        {error && errorAlert(error.message)}

        {!isLoading &&
          !isFetching &&
          !error &&
          data &&
          data?.data?.map((apartment) => (
            // apartment cards
            <ApartmentCard
              key={apartment._id}
              {...apartment}
              handleSelectedApartment={handleSelectedApartment}
            />
          ))}
      </div>

      <div className="flex justify-center items-center lg:pb-20">
        <div className="flex gap-4">
          {pages.map((num) => (
            <button
              key={num}
              className={`btn ${
                data.currentPage === num ? "btn-warning" : "btn-active"
              }`}
              onClick={() => {
                setPage(num);
              }}
            >
              Page {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartment;
