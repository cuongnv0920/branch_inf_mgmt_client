import {
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { logout } from "features/Auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  iconButton: {
    color: "#47544D",
  },

  menuItem: {
    fontFamily: "'Muli', sans-serif",
  },
}));

function Header(props) {
  const classes = useStyle();
  const openDrawer = useSelector((state) => state.drawer);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenuAccount = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuAccount = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = () => {
    const action = openMenu();
    dispath(action);
  };

  const handleLogout = () => {
    const action = logout();
    dispath(action);
    setAnchorEl(null);
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
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenuAccount}
          className={classes.iconButton}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleCloseMenuAccount}
        >
          <MenuItem onClick={handleLogout} className={classes.menuItem}>
            <ListItemIcon style={{ minWidth: "45px" }}>
              <ExitToAppIcon style={{ color: "#f50057" }} fontSize="small" />
            </ListItemIcon>
            Thoát
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
