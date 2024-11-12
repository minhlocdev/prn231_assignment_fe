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
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";

const { Option } = Select;

const BookingForm = () => {
  const { user } = useAuth();

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <Form
      name="booking_form"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        date: dayjs(new Date()),
        timeStart: dayjs(new Date()),
        timeEnd: dayjs().add(1, "hour"),
        userId: user.userId,
      }}
    >
      <Form.Item
        label="Court ID"
        name="courtId"
        hidden="true"
        rules={[{ required: true, message: "Please input the court ID!" }]}
      >
        <Input type="hidden" placeholder="Enter Court ID" />
      </Form.Item>

      <Form.Item
        label="User ID"
        name="userId"
        hidden="true"
        rules={[{ required: true, message: "Please input your user ID!" }]}
      >
        <Input type="hidden" placeholder="Enter User ID" />
      </Form.Item>
      <Row
        gutter={{
          xs: 8,
          md: 16,
          lg: 32,
        }}
      >
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <div>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker />
            </Form.Item>
          </div>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <div>
            <Form.Item
              label="Start Time"
              name={["timeStart"]}
              rules={[{ required: true, message: "Please select start time!" }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </div>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <div>
            <Form.Item
              label="End Time"
              name={["timeEnd"]}
              rules={[{ required: true, message: "Please select end time!" }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </div>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <div>
            <Form.Item
              label="Number of Players"
              name="numberOfPlayers"
              rules={[
                {
                  required: true,
                  message: "Please input the number of players!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Number of Players" />
            </Form.Item>
          </div>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 4 }}
        >
          <div>
            {" "}
            <Form.Item
              label="Sharing Mode"
              name="sharingMode"
              rules={[
                { required: true, message: "Please select sharing mode!" },
              ]}
            >
              <Select placeholder="Select Sharing Mode">
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>
          </div>
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

export default BookingForm;
