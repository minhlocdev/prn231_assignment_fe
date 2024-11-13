import BookingsCalendarView from "./bookingsCalendarView";

const PendingPage = () => {
  // UnPaid = 0,
  // Reserved = 1,
  // Completed = 2,
  // Cancelled = 3,

  return <BookingsCalendarView status={"UnPaid"} />;
};

export default PendingPage;
