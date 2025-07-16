

const ApartmentCard = ({
  _id,
  image,
  floor,
  block,
  apartmentNo,
  rent,
  handleSelectedApartment,
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          className="hover:scale-115 duration-500"
          src={image}
          alt={`${block} ${apartmentNo}`}
        />
      </figure>

      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-sm">Floor: {floor}</button>
          <button className="btn btn-sm">Block: {block}</button>
          <button className="btn btn-sm">Apartment No: {apartmentNo}</button>
          <button className="badge badge-md badge-secondary badge-soft ">
            Rent: ${rent}
          </button>
        </div>

        <div className="card-actions justify-end">
          <button
            className="btn  btn-sm bg-teal-900 text-white"
            onClick={() => handleSelectedApartment({
              _id,
              image,
              floor,
              block,
              apartmentNo,
              rent,
            })}
          >
            Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
