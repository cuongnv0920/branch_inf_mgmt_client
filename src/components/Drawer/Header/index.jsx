import { IconButton, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/Auth/authSlice";
import { openMenu } from "../drawerSlice";

Header.propTypes = {};

const drawerWidth = 200;

const useStyle = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  toolbar: {
    minHeight: "50px",
    backgroundColor: "#fff",
  },

  title: {
    color: "#00524e",
    fontFamily: "Muli, sans-serif",
    fontWeight: 600,
    fontSize: "1.3rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
  },

  menuButton: {
    marginRight: 36,
  },

  hide: {
    display: "none",
  },

  logout: {
    color: "#ff3d00",
  },
}));

function Header(props) {
  const classes = useStyle();

  const openDrawer = useSelector((state) => state.drawer);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    const action = openMenu();
    dispath(action);
  };

  const handleLogout = () => {
    const action = logout();
    dispath(action);

    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openDrawer,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={handleOpenMenu}
          className={clsx(classes.menuButton, {
            [classes.hide]: openDrawer,
          })}
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title}>
          HỆ THỐNG QUẢN LÝ NGƯỜI DÙNG CHI NHÁNH
        </Typography>

        <IconButton
          title="Thoát"
          onClick={handleLogout}
          className={classes.logout}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
