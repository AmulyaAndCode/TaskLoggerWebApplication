import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

const CardComponent = (props) => {
  const { children, ...rest } = props;
  return (
    <Card
      {...rest}
      style={{
        ...rest.style,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      {children}
    </Card>
  );
};

CardComponent.propTypes = {
  children: PropTypes.element,
};

export default CardComponent;
