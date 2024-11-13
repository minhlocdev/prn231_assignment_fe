import BookingsCalendarView from "./bookingsCalendarView";

const CancelledPage = () => {
  // UnPaid = 0,
  // Reserved = 1,
  // Completed = 2,
  // Cancelled = 3,

  return <BookingsCalendarView status={"Cancelled"} />;
};

export default CancelledPage;
