import BookingsCalendarView from "./bookingsCalendarView";

const DonePage = () => {
  // UnPaid = 0,
  // Reserved = 1,
  // Completed = 2,
  // Cancelled = 3,

  return <BookingsCalendarView status={"Completed"} />;
};

export default DonePage;
