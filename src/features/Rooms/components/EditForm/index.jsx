import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { InputField } from "components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EditForm(props) {
  const selected = useSelector((state) => state.room);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập Tên phòng/ ban."),
    code: yup.string().required("Vui lòng nhập Mã phòng/ ban."),
    sort: yup.string().required("Vui lòng nhập Số xắp sếp."),
  });

  const form = useForm({
    defaultValues: {
      name: selected.name,
      code: selected.code,
      sort: selected.sort,
      id: selected.id,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editRoom">
      <div className="editRoom__title dialogTitle">
        <Typography className="dialogTitle_content">Sửa phòng/ ban</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="Tên phòng/ ban" form={form} />
        <InputField name="code" label="Mã phòng/ ban" form={form} />
        <InputField name="sort" type="number" label="Số sắp xếp" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="editRoom__progress" />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
