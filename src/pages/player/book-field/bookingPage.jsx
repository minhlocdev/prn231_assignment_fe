import { useState } from "react";
import HelmetTitle from "../../../components/hoc/helmetTitle";
import BookingForm from "./bookingForm";
import { CourtTable } from "./courtTable";
import SlotSuggestion from "./slotSuggetion";

const BookingPage = () => {
  const [selectedCourt, setSelectedCourt] = useState();

  return (
    <>
      <HelmetTitle title="Booking"></HelmetTitle>
      <CourtTable
        selectedCourt={selectedCourt}
        handleSelectCourt={setSelectedCourt}
      />

      <SlotSuggestion selectedCourt={selectedCourt} />
      <BookingForm selectedCourt={selectedCourt} />
    </>
  );
};

export default BookingPage;
