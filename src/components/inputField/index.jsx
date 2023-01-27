import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
};

export function InputField(props) {
  const { form, name, label, disabled, inputProps, type } = props;
  const { control } = form;

  return (
    <div style={{ marginTop: "16px" }}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name },
          fieldState: { invalid, error },
        }) => (
          <TextField
            type={type}
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            error={invalid}
            helperText={error?.message}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            disabled={disabled}
            inputProps={inputProps}
          />
        )}
      />
    </div>
  );
}
