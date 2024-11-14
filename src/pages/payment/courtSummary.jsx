import { Card } from "antd";
import PropTypes from "prop-types";

const CourtSummary = ({ court }) => {
  return (
    <Card
      className="flex"
      cover={
        <img
          alt="court-image"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <div className="w-full flex gap-x-10">
        <div className="flex flex-col gap-y-4">
          <p>Court name: {court?.courtName}</p>
          <p>Location: {court?.courtGroup?.location}</p>
          <p>Contact: {court?.contact}</p>
        </div>
        <div className="flex flex-col gap-y-4">
          {court?.courtSlots &&
            court?.courtSlots?.length > 0 &&
            court.courtSlots.map((slot) => (
              <div key={slot?.cost} className="flex gap-x-6">
                <p>
                  Slot: {slot?.timeStart} - {slot?.timeEnd}
                </p>
                <p>Cost: {slot?.cost} VND</p>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};

CourtSummary.propTypes = {
  court: PropTypes.object,
};
export default CourtSummary;
