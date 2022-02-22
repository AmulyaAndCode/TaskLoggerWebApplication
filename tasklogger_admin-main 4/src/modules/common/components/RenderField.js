import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const { TextArea } = Input;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RenderField = (props) => {
  const {
    input,
    label,
    max,
    prefix,
    type,
    min,
    meta,
    showLabel,
    fullWidth,
    extraContent,
    withoutFormItem,
  } = props;
  const { touched, error, submitError, submitFailed } = meta;

  let validateStatus = "";

  const showError = (touched || submitFailed) && (error || submitError);

  if (showError) {
    validateStatus = "error";
  }

  const layoutParams = fullWidth ? {} : formItemLayout;

  const renderElement =
    type === "textarea" ? (
      <TextArea {...input} placeholder={label} autosize={{ minRows: 6, maxRows: 12 }} />
    ) : (
      <Input
        {...input}
        addonAfter={props.addonAfter}
        addonBefore={props.addonBefore}
        placeholder={label}
        type={type}
        prefix={prefix}
        min={min}
        max={max}
      />
    );

  if (withoutFormItem) return renderElement;

  return (
    <FormItem
      {...layoutParams}
      label={showLabel && label}
      validateStatus={validateStatus}
      help={showError && (error || submitError)}
    >
      {renderElement}
      {!!extraContent && extraContent(input)}
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  showLabel: PropTypes.bool,
};

RenderField.defaultProps = {
  showLabel: true,
};

export default RenderField;
