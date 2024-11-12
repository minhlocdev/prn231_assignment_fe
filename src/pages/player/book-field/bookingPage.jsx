import HelmetTitle from "../../../components/hoc/helmetTitle";
import BookingForm from "./bookingForm";
import { CourtTable } from "./courtTable";

const BookingPage = () => {
  return (
    <>
      <HelmetTitle title="Booking"></HelmetTitle>
      <CourtTable />
      <BookingForm />
    </>
  );
};

export default BookingPage;
