import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Drawer } from "components";
import Auth from "features/Auth";
import Level from "features/Levels";
import Room from "features/Rooms";
import User from "features/Users";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const logged = useSelector((state) => state.auth.current);
  const isLogged = !!logged._id;
  const classes = useStyles();

  const routes = [
    {
      path: "room/*",
      element: <Room />,
      role: "admin",
    },
    {
      path: "level/*",
      element: <Level />,
      role: "admin",
    },
    {
      path: "user/*",
      element: <User />,
      role: "admin",
    },
  ];

  return (
    <div>
      {!isLogged && <Auth />}

      {isLogged && (
        <div className={classes.root}>
          <Drawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
