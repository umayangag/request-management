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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from '@material-ui/core/TextField';

import * as publicApi from "../../api/public";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import { useLoadingStatus } from "../../loading-spinners/loadingHook";

const styles = (theme) => ({
  root: {
    // width: "90%",
    marginTop: theme.spacing.unit * 2,
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
  },
  card: {
    maxWidth: 400,
  },
  textField: {
    width: "95%",
  }
});

const GuestRefIdCheck = (props) => {
  const { formatMessage: f } = useIntl();
  const dispatch = useDispatch();
  const { classes } = props;
  const [refId, setRefId] = useState("");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");


  useEffect( () => {
    if (!refId){
      setRefId(getQueryParamRefId())
    }
  })

  // TODO: following is a temp work.
  // may have to use proper query param plugin.
  const getQueryParamRefId = () => {
    const queryParam = window.location.search.split("=");
    return queryParam[1];
  }

  const handleSubmit = async () => {
    try {
      const response = (await publicApi.checkIncidentStatus(refId)).data;
      setStatus(response.reply);
      setMessages(response.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const onActionButtonClick = async (actions, workflowType) => {
    try {
      const workflowUpdate = {
        start_event: actions.start_event,
        comment: comment
      }
      const response = await publicApi.updateIncidentWorkflow(
        actions.incident_id,
        workflowType,
        workflowUpdate
      );
    } catch (error) {
      console.log(error)
    }
    props.history.push(`/report/status?refId=`+refId);
    window.location.reload();
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
              id="request.management.report.check.status"
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
              {/* <InputLabel htmlFor="email"><FormattedMessage id="request.management.login.username" /></InputLabel> */}
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
                id="request.management.report.check.status.submit"
                defaultMessage="Submit Reference Number"
              />
            </Button>
          </form>
        </Paper>
      </main>

      <Grid container spacing={24} align="center">
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" className={classes.status}>
            {status}
          </Typography>
        </Grid>

        {messages &&
          messages.map((message, index) => (
            <Grid item xs={12} key={index}>
              <Card className={classes.card} align="left">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {message.header}
                  </Typography>
                  <Typography component="p">{message.content}</Typography>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="comment"
                      label="Type in your reply"
                      className={classes.textField}
                      value={comment}
                      onChange={ (e) => {setComment(e.target.value)}}
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows="4"
                    />
                  </form>
                </CardContent>
                {message.actions && (
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => (onActionButtonClick(message.actions, "provide-information"))}
                    >
                      {message.actions.name}
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

GuestRefIdCheck.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GuestRefIdCheck);
