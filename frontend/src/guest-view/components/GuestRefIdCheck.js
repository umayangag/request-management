//TODO: remove unwanted imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { useIntl, FormattedMessage } from "react-intl";
import ReCAPTCHA from "react-google-recaptcha";

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

import * as publicApi from "../../api/public"

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import { useLoadingStatus } from "../../loading-spinners/loadingHook";

const styles = (theme) => ({
  root: {
    width: "90%",
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
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
  }
});

const GuestRefIdCheck = (props) => {
  const { formatMessage: f } = useIntl();
  const dispatch = useDispatch();
  const { classes } = props;
  const [refId, setRefId] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = () => {
    let response
    try {
      response = publicApi.checkIncidentStatus(refId)
    } catch (error) {
      console.log(error)
    }
    setStatus(response)
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

      <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <SearchIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <FormattedMessage
                id="eclk.incident.management.report.check.status"
                defaultMessage="Check Status"
              />
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <FormControl margin="normal" required fullWidth>
                {/* <InputLabel htmlFor="email"><FormattedMessage id="eclk.incident.management.login.username" /></InputLabel> */}
                <Input
                  id="email"
                  name="email"
                  value={refId}
                  onChange={(e) => {
                    setRefId(e.target.value);
                  }}
                  autoFocus
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                <FormattedMessage
                  id="eclk.incident.management.report.check.status.submit"
                  defaultMessage="Submit Reference ID"
                />
              </Button>
            </form>
          </Paper>
        </main>

      <Grid container spacing={24} align="center">
        <Grid item xs={12}>
          {/* <Button variant="outlined" onClick={() => { window.history.back(); }}> Back </Button> */}
          {/* <Typography
            style={{ width: "100%" }}
            align="center"
            variant="h5"
            marginTop="20"
          >
            {f({
              id: "eclk.incident.management.report.check.status",
              defaultMessage: "Report Check Status",
            })}
          </Typography> */}
          {/* <Typography style={{ width: '100%' }} align="left" variant="" marginTop="20">
                {f({ id: "eclk.incident.management.report.incidents.helper.text", defaultMessage: "*fields are mandatory" })}
            </Typography> */}
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className={classes.status}>
              {status}
            </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

GuestRefIdCheck.propTypes = {
  classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(GuestRefIdCheck));
