import { useState } from "react";
import HelmetTitle from "../../../components/hoc/helmetTitle";
import BookingForm from "./bookingForm";
import { CourtTable } from "./courtTable";
import CourtSlotSuggestion from "./courtSLotSuggetion";

const BookingPage = () => {
  const [selectedCourt, setSelectedCourt] = useState();

  return (
    <>
      <HelmetTitle title="Booking"></HelmetTitle>
      <CourtTable
        selectedCourt={selectedCourt}
        handleSelectCourt={setSelectedCourt}
      />

      <CourtSlotSuggestion selectedCourt={selectedCourt} />
      <BookingForm selectedCourt={selectedCourt} />
    </>
  );
};

export default BookingPage;
