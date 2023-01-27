import { Box, Container, Grid, Paper } from "@material-ui/core";
import Login from "features/Auth/components/Login";
import React from "react";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Container className="pageAuth">
        <Grid container className="pageAuth__grid">
          <Grid
            item
            xs={12}
            lg={4}
            sm={4}
            md={4}
            className="pageAuth__item"
          ></Grid>
          <Grid item xs={12} lg={4} sm={12} md={4} className="pageAuth__item">
            <Paper elevation={2} className="pageAuth__paper">
              <Login className="pageAuth__table" />
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            sm={12}
            md={4}
            className="pageAuth__item"
          ></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
