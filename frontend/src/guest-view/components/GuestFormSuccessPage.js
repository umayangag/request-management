import React from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useIntl, FormattedMessage } from "react-intl";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { changeLanguage } from "../../shared/state/sharedActions";
import Logo from "../../app/Logo";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SearchIcon from "@material-ui/icons/Search";

import { resetIncidentState } from "../../incident/state/incidentActions";
import { moveStepper } from "../state/guestViewActions";

const styles = (theme) => ({
  root: {
    // width: "90%",
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    // marginTop: theme.spacing.unit * 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: 45,
    height: 45,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  status: {
    marginTop: theme.spacing.unit * 3,
  },
});

function GuestFormSuccessPage(props) {
  const dispatch = useDispatch();
  const incident = useSelector((state) => state.incident.activeIncident.data);
  const { classes } = props;

  const handleButtonClick = (action) => {
    switch (action) {
      case "edit":
        dispatch(moveStepper({step:0}))
        props.history.push("/report");
        break;
      case "status":
        props.history.push(`/report/status`);
        break;
      case "create":
        dispatch(resetIncidentState());
        dispatch(moveStepper({step:0}))
        props.history.push(`/report`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={6}>
            <Logo />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("si"))}
              className={classes.button}
            >
              {" "}
              Sinhala{" "}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("ta"))}
              className={classes.button}
            >
              {" "}
              Tamil{" "}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => dispatch(changeLanguage("en"))}
              className={classes.button}
            >
              {" "}
              English{" "}
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={16} style={{ marginTop: "13%" }}>
        <Grid item xs={12}>
          <h1
            style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
          >
            Your complaint has been submitted successfully.
          </h1>
        </Grid>
        {incident && (
          <>
            <Grid
              item
              xs={12}
              style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
            >
              <Typography variant="subtitle1">Your reference number</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
            >
              <Typography variant="h3" gutterBottom>
                {incident.refId}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12} style={{ marginTop: "30px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {/* <Button variant='outlined' onClick={()=>{handleButtonClick('edit')}}>Add/ edit information</Button> */}
            <Button
              className={classes.margin}
              size="large"
              variant="outlined"
              onClick={() => {
                handleButtonClick("status");
              }}
            >
              Check Status
            </Button>
            <Button
              className={classes.margin}
              size="large"
              variant="outlined"
              onClick={() => {
                handleButtonClick("create");
              }}
            >
              Create another complaint
            </Button>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(GuestFormSuccessPage);
