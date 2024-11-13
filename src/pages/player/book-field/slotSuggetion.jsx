import { Card, Col, Descriptions, Row, Spin } from "antd";
import { useFetchCourt } from "../../../utils/services/courtService";
import PropTypes from "prop-types";
const SlotSuggestion = ({ selectedCourt }) => {
  const { data: courtDetail, isLoading: detailLoading } = useFetchCourt(
    selectedCourt?.courtId
  );

  return (
    <div className="pb-4">
      <h2 className="text-lg font-semibold pb-2">Court Slot Suggestion</h2>
      <Row gutter={16}>
        {detailLoading ? (
          <Col span={24} className="min-h-32 flex items-center justify-center">
            <Spin size="small" />
          </Col>
        ) : (
          courtDetail != null &&
          courtDetail.result.courtSlots.map((slot) => (
            <Col key={slot.cost} className="gutter-row" span={6}>
              <Card size="small" title="Slot">
                <Descriptions
                  bordered
                  items={[
                    {
                      key: "1",
                      label: "Cost",
                      span: 3,
                      children: slot.cost,
                    },
                    {
                      key: "2",
                      label: "Slot time",
                      span: 3,
                      children: `${slot.timeStart} - ${slot.timeEnd}`,
                    },
                    {
                      key: "3",
                      label: "Status",
                      span: 3,
                      children: slot.status,
                    },
                  ]}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

SlotSuggestion.propTypes = {
  selectedCourt: PropTypes.object,
};

export default SlotSuggestion;
