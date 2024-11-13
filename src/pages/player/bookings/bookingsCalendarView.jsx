import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import useAuth from "../../../hooks/useAuth";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useFetchBookings } from "../../../utils/services/bookingService";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"

const BookingsCalendarView = ({ status }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useFetchBookings(
    "",
    "",
    {
      UserId: user?.userId,
      Status: status,
    },
    "",
    "asc",
    1,
    100
  );

  const [events, setEvents] = useState([]);

  const makeEvent = () => {
    if (data?.result?.data && data.result.data.length > 0) {
      const transformedEvents = data.result.data.map((booking) => ({
        title: `${booking.courtName} - ${booking.status}`,
        start: `${booking.date}T${booking.timeStart}`,
        end: `${booking.date}T${booking.timeEnd}`,
        extendedProps: {
          sharingMode: booking.sharingMode,
          bookingId: booking.bookingId,
          userName: booking.userName,
        },
      }));
      setEvents(transformedEvents);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      makeEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  const handleEventClick = (info) => {
    const bookingId = info.event.extendedProps.bookingId; // Get the booking ID
    navigate(`/player/bookings/${bookingId}`); // Navigate to the details page
  };
  return (
    <FullCalendar
      locale={"vi"}
      headerToolbar={{
        center: "title",
        left: "prev,next",
        right: "listMonth,timeGridWeek,dayGridWeek",
      }}
      schedulerLicenseKey={import.meta.env.VITE_SCHEDULER_LICENSE_KEY}
      plugins={[listPlugin, timeGridPlugin, dayGridPlugin]}
      initialView="listMonth"
      weekends={false}
      events={events}
      eventClick={handleEventClick}
    />
  );
};

BookingsCalendarView.propTypes = {
    status: PropTypes.string
}

export default BookingsCalendarView;
