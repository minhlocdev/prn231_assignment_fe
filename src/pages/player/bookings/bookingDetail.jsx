import { useParams } from "react-router-dom";
import { useFetchBooking } from "../../../utils/services/bookingService";
import { useFetchCourt } from "../../../utils/services/courtService";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const { data, isLoading, isError } = useFetchBooking(bookingId);
  const {
    data: court,
    isLoading: courtLoading,
    isError: courtError,
  } = useFetchCourt(data?.result?.courtId);
  return <>Detail</>;
};

export default BookingDetail;
