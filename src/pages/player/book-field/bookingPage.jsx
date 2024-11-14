import { useEffect, useState } from "react";
import HelmetTitle from "../../../components/hoc/helmetTitle";
import BookingForm from "./bookingForm";
import { CourtTable } from "./courtTable";
import SlotSuggestion from "./slotSuggetion";
import { useParams } from "react-router-dom";
import { useFetchBooking } from "../../../utils/services/bookingService";
import { useFetchCourt } from "../../../utils/services/courtService";
import CourtSummary from "../../payment/courtSummary";

const BookingPage = () => {
  const { bookingId } = useParams();
  const { data } = useFetchBooking(bookingId);
  const { data: court } = useFetchCourt(data?.result?.courtId);
  const [selectedCourt, setSelectedCourt] = useState();

  useEffect(() => {
    if (court != null) {
      setSelectedCourt(court.result);
    }
  }, [court]);

  return (
    <>
      <HelmetTitle title="Booking"></HelmetTitle>
      {bookingId ? (
        <div className="py-5">
          <CourtSummary court={court?.result} />
        </div>
      ) : (
        <>
          <CourtTable
            selectedCourt={selectedCourt}
            handleSelectCourt={setSelectedCourt}
          />

          <SlotSuggestion selectedCourt={selectedCourt} />
        </>
      )}
      <BookingForm booking={data?.result} selectedCourt={selectedCourt} />
    </>
  );
};

export default BookingPage;
