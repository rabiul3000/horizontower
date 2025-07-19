import { MdApartment, MdOutlineAttachMoney } from "react-icons/md";
import { FaBuilding, FaHandshake, FaRegCalendarCheck } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";

const RentedApartmentCard = ({ apartment }) => {
  return (
    <div className="mt-8">
      <h1 className="text-center text-xl font-semibold">
        Rented Apartment Info
      </h1>
      <div className="divider divider-accent"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-base-200 rounded-xl shadow">
        <div className="flex items-center gap-2">
          <FaBuilding className="text-primary text-xl" />
          <span className="font-medium">Block:</span> {apartment.block}
        </div>

        <div className="flex items-center gap-2">
          <MdApartment className="text-primary text-xl" />
          <span className="font-medium">Apartment No:</span>{" "}
          {apartment.apartmentNo}
        </div>

        <div className="flex items-center gap-2">
          <BsFillDoorOpenFill className="text-primary text-xl" />
          <span className="font-medium">Floor:</span> {apartment.floor}
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineAttachMoney className="text-primary text-xl" />
          <span className="font-medium">Rent:</span> ${apartment.rent}
        </div>

        <div className="flex items-center gap-2">
          <FaHandshake className="text-primary text-xl" />
          <div className="font-medium">
            Agreement status:{" "}
            <span className="text-success"> {apartment.status} </span>{" "}
          </div>{" "}
        </div>

        <div className="flex items-center gap-2">
          <FaRegCalendarCheck className="text-primary text-xl" />
          <div className="font-medium">Agreement accept date:</div>{" "}
          <span className="badge badge-info badge-sm">
            {new Intl.DateTimeFormat("en-GB").format(
              new Date(apartment.updatedAt)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentedApartmentCard;
