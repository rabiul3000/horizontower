import { useQuery } from "@tanstack/react-query";
import data from "../../fakeData/apartments.json";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import Badge from "@mui/material/Badge";

const Apartment = () => {
  const [rangeValue, setRangeValue] = useState(0);

  const valuetext = (value) => {
    setRangeValue(value);
    return value;
  };

  return (
    <div className="bg-teal-900">
      <div className="w-full h-40 "> </div>

      {/*  search by range  */}
      <div className="text-center lg:w-6/12 w-11/12 font-semibold items-start mx-auto bg-base-200 rounded-xl lg:p-8 p-4 flex flex-col gap-4">
        <h1 className="text-xl">Lets Find Your Home</h1>
        <div className="w-full">
          <Slider
            sx={{ color: "teal" }}
            aria-label="Temperature"
            defaultValue={100}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={100}
            marks
            min={100}
            max={2000}
          />
        </div>
        <div className="flex lg:flex-row flex-col  items-start justify-center  gap-4">
          <input
            className="input w-fit"
            readOnly
            type="text"
            defaultValue={0}
            value={`From: $${100}`}
          />
          <input
            className="input w-fit "
            readOnly
            type="text"
            defaultValue={0}
            value={`To: $${rangeValue}`}
          />
          <button className="btn">Search Home</button>
        </div>
      </div>

      {/*  search by range  */}

      <div className="text-center py-8 text-4xl text-white">
        <h1>All Floors</h1>
      </div>
      <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-6 pb-24">
        {data.map(({ id, floor, block, apartmentNumber, rent }) => (
          <div className="card bg-base-100 w-96 shadow-xl" key={id}>
            <figure>
              <img
                className="hover:scale-115 duration-500"
                src="https://picsum.photos/400/250"
                alt="floor"
              />
            </figure>
            <div className="card-body">
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-sm">Floor: {floor}</button>
                <button className="btn btn-sm">Block: {block}</button>
                <button className="btn btn-sm">
                  Apartment: {apartmentNumber}
                </button>
                <button className="badge badge-md badge-secondary badge-soft ">
                  Rent: ${rent}
                </button>
              </div>

              <div className="card-actions justify-end">
                <button className="btn  btn-sm bg-teal-900 text-white">
                  Agreement
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
