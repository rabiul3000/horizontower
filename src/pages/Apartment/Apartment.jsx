import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosPublic, axiosSecure } from "../../hooks/useAxios";
import { confirmAlert, errorAlert, successAlert } from "../../utils/alerts";
import LoadingState from "../../utils/LoadingState";
import RangeSlider from "../../components/RangeSlider.jsx/RangeSlider";
import ApartmentCard from "../../components/Cards/ApartmentCard";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router";
import LoadingModal from "../../utils/LoadingModal";

const Apartment = () => {
  const DEFAULT_FROM = 1215;
  const DEFAULT_TO = 4900;

  const [fromRange, setFromRange] = useState(DEFAULT_FROM);
  const [toRange, setToRange] = useState(DEFAULT_TO);
  const [page, setPage] = useState(1);
  const [searchActive, setSearchActive] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["apartment", searchActive, page],
    queryFn: async () => {
      const params = searchActive ? { fromRange, toRange } : { page, limit: 6 };

      const res = await axiosPublic.get("/apartment/all", { params });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleFindByRange = () => {
    if (fromRange > toRange) {
      errorAlert("From range must be less than to range");
      return;
    }
    setSearchActive(true);
    setPage(1);
    refetch();
  };

  const handleClearFilter = () => {
    setFromRange(DEFAULT_FROM);
    setToRange(DEFAULT_TO);
    setSearchActive(false);
    setPage(1);
    setSortOrder(null);
    refetch();
  };

  const pages = [];
  if (!searchActive && data?.totalPages) {
    for (let i = 1; i <= data.totalPages; i++) {
      pages.push(i);
    }
  }

  const handleSelectedApartment = async (apartment) => {
    try {
      if (!user) return navigate("/login");

      if (apartment.status === "not_available") {
        errorAlert("This apartment is already rented or in agreement");
        return;
      }

      const isConfirmed = await confirmAlert(
        "Do You Really Want To Book This Apartment?"
      );

      setLoading(true);

      if (isConfirmed) {
        const res = await axiosSecure.post("/agreement/create", {
          apartment,
          user,
        });
        if (res.status === 201) successAlert("Booking Successful");
      }
    } catch (error) {
      if (error.status === 409) errorAlert("You already have a booking");
      else errorAlert(error?.response?.data?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // --- Apply sorting locally (frontend only) ---
  let sortedData = data?.data ? [...data.data] : [];
  if (sortOrder === "asc") {
    sortedData.sort((a, b) => a.rent - b.rent);
  } else if (sortOrder === "desc") {
    sortedData.sort((a, b) => b.rent - a.rent);
  }

  return (
    <div className="bg-teal-900">
      <div className="w-full h-40" />

      {/* Filter/Search UI */}
      <div className="text-center lg:w-6/12 w-11/12 font-semibold items-start mx-auto bg-base-200 rounded-xl lg:p-8 p-4 flex flex-col gap-4">
        <h1 className="text-xl">Let's Find Your Home</h1>

        <RangeSlider
          setFromRange={setFromRange}
          setToRange={setToRange}
          fromRange={fromRange}
          toRange={toRange}
        />

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

          <button
            className="btn bg-teal-700 text-white"
            onClick={handleFindByRange}
          >
            {isFetching ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Searching...
              </>
            ) : (
              "Search Home"
            )}
          </button>

          {searchActive && (
            <>
              <button className="btn btn-ghost">
                Total result found: {data?.total}
              </button>
              <button className="btn btn-error" onClick={handleClearFilter}>
                Clear Filter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center py-8 text-4xl text-white lg:pt-20">
        <h1>All Floors</h1>

        {/* Sorting Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setSortOrder("asc")}
            className={`btn ${
              sortOrder === "asc" ? "btn-warning" : "btn-outline"
            }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`btn ${
              sortOrder === "desc" ? "btn-warning" : "btn-outline"
            }`}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      <LoadingModal loading={loading} />

      <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-6 pb-24">
        {(isLoading || isFetching) && <LoadingState />}
        {error && errorAlert(error.message)}

        {!isLoading &&
          !isFetching &&
          !error &&
          sortedData?.map((apartment) => (
            <ApartmentCard
              key={apartment._id}
              {...apartment}
              handleSelectedApartment={handleSelectedApartment}
            />
          ))}
      </div>

      {/* Pagination only for default view */}
      {!searchActive && (
        <div className="flex justify-center items-center lg:pb-20">
          <div className="flex gap-4">
            {pages.map((num) => (
              <button
                key={num}
                className={`btn ${
                  data?.currentPage === num ? "btn-warning" : "btn-active"
                }`}
                onClick={() => setPage(num)}
              >
                Page {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Apartment;
