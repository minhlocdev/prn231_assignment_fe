import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const HelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

HelmetTitle.propTypes = {
  title: PropTypes.string.isRequired, // Validate that title is a required string
};

export default HelmetTitle;
