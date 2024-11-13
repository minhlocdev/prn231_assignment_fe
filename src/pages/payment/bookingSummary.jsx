import PropTypes from "prop-types";
import CourtSummary from "./courtSummary";
const BookingSummary = ({ booking, court }) => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-y-3">
      <h2 className="font-semibold text-xl">Booking Detail</h2>
      <div className="w-full h-full flex flex-col gap-y-5 border rounded-lg p-3">
        <CourtSummary court={court} />
        <div className="flex justify-between">
          <span className="font-semibold">Start Time:</span>
          <span>{booking.timeStart}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">End Time:</span>
          <span>{booking.timeEnd}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Sharing Mode:</span>
          <span>{booking.sharingMode}</span>
        </div>
        {booking.note && (
          <div className="flex justify-between">
            <span className="font-semibold">Note:</span>
            <span>{booking.note}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold">Created At:</span>
          <span>{new Date(booking.createAt).toLocaleString()}</span>{" "}
          {/* Format date */}
        </div>
      </div>
    </div>
  );
};

BookingSummary.propTypes = {
  booking: PropTypes.object,
  court: PropTypes.object,
};

export default BookingSummary;
