import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

DateField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  lable: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string,
};

export function DateField(props) {
  const { form, name, disabled, lable, format } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            disableToolbar
            variant="inline"
            label={lable}
            format={format}
            margin="normal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            disabled={disabled}
          />
        </MuiPickersUtilsProvider>
      )}
    ></Controller>
  );
}
