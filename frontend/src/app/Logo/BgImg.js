import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BgImg from "../../static/img/bg-home.jpg";
import "./BgImg.css";

function Logo(props) {
  return (
    <div className="bg-container">
      <Link to="/">
        {/* <img
          src={BgImg}
          alt="logo"
          style={{
            maxWidth: props.maxWidth,
          }}
        /> */}
      </Link>
    </div>
  );
}

Logo.propTypes = {
  maxWidth: PropTypes.string,
};

export default Logo;
