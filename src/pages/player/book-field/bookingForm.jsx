import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Row,
  Col,
} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "antd/es/form/Form";
import {
  validateDate,
  validateNumberOfPlayers,
  validateTimeDifference,
} from "../../../utils/helpers/validator";
import {
  convertDateToDateOnlyString,
  convertDateToTimeOnlyString,
  roundToNearestHalfHour,
} from "../../../utils/helpers/dateFormat";
import {
  useCreateBooking,
  useUpdateBooking,
} from "../../../utils/services/bookingService";

const { Option } = Select;

const BookingForm = ({ booking, selectedCourt }) => {
  const { user } = useAuth();
  const [bookingForm] = useForm();

  const createBookingMutation = useCreateBooking();
  const updateBookingMutation = useUpdateBooking();
  const onFinish = (values) => {
    if (booking) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };
  const onUpdate = async (values) => {
    const param = {
      timeStart: convertDateToTimeOnlyString(values.timeStart),
      timeEnd: convertDateToTimeOnlyString(values.timeEnd),
      date: convertDateToDateOnlyString(values.date),
      numberOfPlayers: values.numberOfPlayers,
      sharingMode: values.sharingMode,
      note: values.note,
      status: booking.status,
    };
    updateBookingMutation.mutate({
      bookingId: booking.bookingId,
      updateParam: param,
    });
  };
  const onCreate = async (values) => {
    const param = {
      ...values,
      courtId: selectedCourt?.courtId,
      timeStart: convertDateToTimeOnlyString(values.timeStart),
      timeEnd: convertDateToTimeOnlyString(values.timeEnd),
      date: convertDateToDateOnlyString(values.date),
    };
    createBookingMutation.mutate(param);
  };
  return (
    <Form
      form={bookingForm}
      name="booking_form"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        date: booking ? dayjs(booking.date, "YYYY-MM-DD") : dayjs(new Date()),
        timeStart: booking
          ? dayjs(`${booking.date} ${booking.timeStart}`)
          : roundToNearestHalfHour(dayjs(new Date())),
        timeEnd: booking
          ? dayjs(`${booking.date} ${booking.timeEnd}`)
          : roundToNearestHalfHour(dayjs().add(1, "hour")),
        userId: user?.userId,
        sharingMode: booking ? booking.sharingMode : "public",
        note: booking ? booking.note : "",
        numberOfPlayers: 2,
      }}
    >
      {!selectedCourt && (
        <div style={{ color: "red" }}>Please choose court!</div>
      )}
      <Form.Item label="User ID" name="userId" hidden="true">
        <Input type="hidden" placeholder="Enter User ID" />
      </Form.Item>
      <Row gutter={{ xs: 8, md: 16, lg: 32 }}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Please select a date!" },
              { validator: validateDate },
            ]}
          >
            <DatePicker minDate={dayjs(Date.now())} />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <Form.Item
            label="Start Time"
            name={["timeStart"]}
            rules={[
              { required: true, message: "Please select start time!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Check if value is undefined or null
                  if (!value) {
                    return Promise.reject(
                      new Error("Please select start time!")
                    );
                  }

                  // Get the current date and time
                  const date = getFieldValue("date");
                  const selectedTime = dayjs(value);

                  // Check if the selected time is today and in the past
                  if (
                    selectedTime.isSame(date, "day") &&
                    selectedTime.isBefore(date)
                  ) {
                    return Promise.reject(
                      new Error(
                        "Invalid time! Start time cannot be in the past."
                      )
                    );
                  }

                  // If validation passes
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" minuteStep={30} />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <Form.Item
            label="End Time"
            name={["timeEnd"]}
            rules={[
              { required: true, message: "Please select end time!" },
              { validator: validateTimeDifference(bookingForm.getFieldValue) },
            ]}
          >
            <TimePicker format="HH:mm" minuteStep={30} />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <Form.Item
            label="Number of Players"
            name="numberOfPlayers"
            rules={[
              {
                required: true,
                message: "Please input the number of players!",
              },
              { validator: validateNumberOfPlayers },
            ]}
          >
            <Input type="number" placeholder="Number of Players" min={2} />
          </Form.Item>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <Form.Item
            label="Sharing Mode"
            name="sharingMode"
            rules={[{ required: true, message: "Please select sharing mode!" }]}
          >
            <Select placeholder="Select Sharing Mode">
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
              <Option value="team">Team</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Note" name="note">
        <Input.TextArea placeholder="Add any notes here..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Booking
        </Button>
      </Form.Item>
    </Form>
  );
};

BookingForm.propTypes = {
  booking: PropTypes.object,
  selectedCourt: PropTypes.object,
};

export default BookingForm;
