import BookingsCalendarView from "./bookingsCalendarView";

const OnGoingPage = () => {
  // UnPaid = 0,
  // Reserved = 1,
  // Completed = 2,
  // Cancelled = 3,

  return <BookingsCalendarView status={"Reserved"} />;
};

export default OnGoingPage;
