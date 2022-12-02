import { Button, LinearProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const selected = useSelector((state) => state.room);

  const form = useForm({
    defaultValues: {
      id: selected.id,
    },
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="deleteRoom">
      {isSubmitting && <LinearProgress className="deleteRoom__progress" />}

      <div className="deleteRoom__title dialogTitle">
        <Typography className="dialogTitle_content">Xóa phòng/ ban</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deleteRoom__content">
          <p>{`Bạn có chắc chắn muốn xóa phòng/ ban: "${selected.name}"`}</p>
        </div>

        <Button
          className="dialogButtonDelete"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Xóa
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;