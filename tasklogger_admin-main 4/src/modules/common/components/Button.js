import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const EdButton = ({ children, ...props }) => <Button {...props}>{children}</Button>;

EdButton.propTypes = {
  icon: PropTypes.any,
  type: PropTypes.string,
  onClick: PropTypes.func
};

EdButton.defaultProps = {
  onClick: () => { }
};

export default EdButton;
