import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RoomIcon from "@material-ui/icons/Room";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeMenu } from "../drawerSlice";
import Footer from "../Footer";
import "./styles.scss";

const menuList = [
  {
    title: "Phòng/ Ban",
    href: "room",
    role: "admin",
    icon: <RoomIcon />,
  },
  {
    title: "Chức danh",
    href: "level",
    role: "admin",
    icon: <AssignmentIcon />,
  },
  {
    title: "Người sử dụng",
    href: "user",
    role: "admin",
    icon: <AccountCircleIcon />,
  },
];

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },

  toogleIcon: {
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },

  ListItemText: {
    color: "#00524e",
    fontFamily: "Muli, sans-serif '!important'",
    fontWeight: 500,
    fontSize: "1rem",
  },
}));

function MenuLeft(props) {
  const theme = useTheme();
  const classes = useStyles();

  const openDrawer = useSelector((state) => state.drawer);
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    const action = closeMenu();
    dispatch(action);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openDrawer,
        [classes.drawerClose]: !openDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        }),
      }}
    >
      <div className={classes.toogleIcon}>
        <IconButton onClick={handleCloseMenu}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>

      <Divider />

      <List className="menuList">
        {menuList.map((menu, _) => (
          <ListItem key={menu.href} className="menuList__item">
            <NavLink to={menu.href} className="menuList__title title">
              <div className="title__icon">{menu.icon}</div>
              <div className="title__text">{menu.title}</div>
            </NavLink>
          </ListItem>
        ))}
      </List>

      <Footer />
    </Drawer>
  );
}

export default MenuLeft;
