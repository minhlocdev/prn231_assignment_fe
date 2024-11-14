import { useParams } from "react-router-dom";
import { useFetchBooking } from "../../utils/services/bookingService";
import { Button, Col, Row, Spin } from "antd";
import { useFetchCourt } from "../../utils/services/courtService";
import BookingSummary from "./bookingSummary";
import { useCreatePayment } from "../../utils/services/paymentService";
import useAuth from "../../hooks/useAuth";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const { data, isLoading, isError } = useFetchBooking(bookingId);
  const { mutateAsync: createPaymentLink, isPending } = useCreatePayment();
  const handleGetPaymentLink = async () => {
    const param = {
      bookingId: bookingId,
      userId: user?.userId,
      type: "banking",
      successUrl: "https://court-booking-one.vercel.app/player/payment/success",
      cancelUrl: "https://court-booking-one.vercel.app/cancelled",
    };
    console.log("Create payment");
    const response = await createPaymentLink(param);
    window.open(response.result, "_blank");
  };

  const {
    data: court,
    isLoading: courtLoading,
    isError: courtError,
  } = useFetchCourt(data?.result?.courtId);

  if (isError || courtError) {
    return <div>There is error in fetching booking detail</div>;
  }
  if (isLoading || courtLoading) {
    return (
      <div className="w-full bg-white border rounded-lg min-h-80 items-center justify-center flex">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white border rounded-lg min-h-80 py-6 px-6">
      {data != null && court != null && (
        <Row gutter={32}>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 16 }}>
            <BookingSummary booking={data?.result} court={court?.result} />
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 8 }}>
            <div className="w-full h-full p-6 flex flex-col gap-y-3">
              <div
                id="embedded-payment-container"
                style={{
                  height: "350px",
                }}
              ></div>
              <h2 className="font-semibold text-xl">Total</h2>

              <div className="flex justify-between">
                <span className="font-semibold">Cost:</span>
                <span>{data.result.cost} VND</span>
              </div>
              <div className="w-full">
                <Button
                  className="w-full"
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleGetPaymentLink();
                  }}
                  disabled={isPending}
                >
                  {isPending ? "Creating link..." : "Pay"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PaymentPage;
