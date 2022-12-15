import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Radio,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { levelApi, roomApi } from "../../../../api/index";
import {
  DateField,
  Input,
  Password,
  RadioField,
  SelectField,
} from "../../../../components/inputField";
import "./styles.scss";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const [rooms, setRooms] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sex, setSex] = useState("Mr");
  const [role, setRole] = useState("user");
  const [birthday, setBirthday] = useState(new Date());

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên người dùng."),
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email người dùng.")
      .email("Địa chỉ email không hợp lệ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu người dùng.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
    room: yup.string().required("Vui phòng chọn phòng/ ban."),
    level: yup.string().required("Vui phòng chọn chức danh."),
    phone: yup.string().required("Vui phòng nhập số điện thoại di động."),
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomApi.list();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await levelApi.list();
      setLevels(levels);
    };
    fetchLevels();
  }, []);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
      room: "",
      level: "",
      phone: "",
      ext: "",
      sex: sex,
      role: role,
      birthday: birthday,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeBirtday = (date) => {
    setBirthday(date);
  };
  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createUser">
      {isSubmitting && <LinearProgress className="createUser__progress" />}

      <div className="createUser__title dialogTitle">
        <Typography className="dialogTitle_content">Thêm người dùng</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6}>
            <Input name="fullName" label="Họ và tên" form={form} />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <Input name="email" label="Địa chỉ email" form={form} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6}>
            <Password name="password" label="Mật khẩu" form={form} />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <Password
              name="retypePassword"
              label="Xác nhận mật khẩu"
              form={form}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6}>
            <SelectField name="room" label="Phòng/ ban" form={form}>
              {rooms.map((room, _) => (
                <MenuItem value={room.id}>{room.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <SelectField name="level" label="Chức danh" form={form}>
              {levels.map((level, _) => (
                <MenuItem value={level.id}>{level.name}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6}>
            <Input name="phone" label="Số điện thoại di động" form={form} />
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <Input name="ext" label="Số điện thoại nội bộ" form={form} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4} md={4} sm={4}>
            <RadioField
              name="sex"
              label="Giới tính"
              onChange={handleChangeSex}
              value={sex}
              form={form}
            >
              <FormControlLabel value="Mr" control={<Radio />} label="Nam" />
              <FormControlLabel value="Ms" control={<Radio />} label="Nữ" />
            </RadioField>
          </Grid>

          <Grid item xs={4} md={4} sm={4}>
            <RadioField
              name="role"
              label="Nhóm quyền"
              onChange={handleChangeRole}
              value={role}
              form={form}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="admin"
              />
            </RadioField>
          </Grid>

          <Grid item xs={4} md={4} sm={4}>
            <DateField
              name="birthday"
              onChange={handleChangeBirtday}
              form={form}
              value={birthday}
              lable="Ngày sinh nhật"
              format="dd/MM/yyyy"
            />
          </Grid>
        </Grid>

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;
