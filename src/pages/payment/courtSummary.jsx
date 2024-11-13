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
      <div className="flex flex-col gap-y-4">
        <p>Court name: {court.courtName}</p>
        <p>Location: {court.courtGroup.location}</p>
        <p>Contact: {court.contact}</p>
      </div>
    </Card>
  );
};

CourtSummary.propTypes = {
  court: PropTypes.object,
};
export default CourtSummary;
