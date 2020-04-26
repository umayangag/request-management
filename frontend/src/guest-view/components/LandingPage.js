import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../../app/Logo";
import BgImg from "../../app/Logo/BgImg";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import CheckStatusIcon from "@material-ui/icons/Announcement";
import { Link } from "react-router-dom";
import { changeLanguage } from "../../shared/state/sharedActions";
import CardMedia from '@material-ui/core/CardMedia';
import "../../app/Logo/BgImg.css";
import Header from "./Header";
import Home from "./Home";
import "aos/dist/aos.css";
import "../../app/Logo/styles/main.scss";
import AOS from "aos";
import $ from "jquery";
import Think from "../../static/img/think.png";
import Check from "../../static/img/check.png";


const styles = theme => ({
  root: {
    margin: 0
  },
  button: {
    margin: theme.spacing.unit
  },
  cardContent: {
    minHeight: 80,
  },
  card: {
    minHeight: 100,
    zIndex:100,
    margin:5,
    // marginTop:0,
    background:'#6f0509',
    borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  overflow: 'hidden',
  },
  card2: {
    minHeight: 100,
    zIndex:100,
    margin:5,
    // marginTop:0,
    background:'#e4a100',
    borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  overflow: 'hidden',
  },
  icon: {
    marginTop: 30,
    fontSize: 40
  },
  cardText: {
    textAlign: "center",
    color:'#ffffff',
    fontSize: '25px',
    lineHeight: '25pt',
    fontFamily: '"oxygen", Noto Sans Sinhala, Noto Sans Tamil,Raleway,Verdana,Arial'
  },
  cardText2: {
    textAlign: "center",
    color:'#000000',
    fontSize: '25px',
    lineHeight: '25pt',
    fontFamily: '"oxygen", Noto Sans Sinhala, Noto Sans Tamil,Raleway,Verdana,Arial'
  },
  bottomText: {
    textAlign: "center"
  },
  hide: {
    display: "none",
  },
  media: {
    height: 140,
  },
  footer: {
    background:'linear-gradient(45deg, #e3e1e2 30%, #e6e1e5 90%)',
  backgroundColor:"orange", /*this your primary color*/
    // backgroundColor: "purple",
    fontSize: "20px",
    // color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  }
});

function HomePage(props) {
  const { classes } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ once: true });
  
    let navElement = $("nav");
  
    $(function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
    $(window).on("scroll", function() {
      $(window).scrollTop() > navElement.innerHeight()
        ? navElement.addClass("sticky")
        : navElement.removeClass("sticky");
    });
  });

  return (
    // <BgImg />
    // <div className={classes.root}>
      <Fragment>
      {/* <Header/> */}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12} sm={8}>
            <Logo />
          </Grid>
        </Grid>
        {/* <Grid item xs={12} >
        <BgImg />
        </Grid> */}
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
      <Home/>

      <Grid
      // className="bg-container"
        container
        spacing={24}
        // alignItems="center"
        justify="center"
        style={{ minHeight: "40vh" }}
      >
        <Grid item xs={12} sm={6} md={3} >
          <Card className={classes.card}>
            <Link to="/report">
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                <Grid direction="raw" container spacing={1}>
                  <Grid item xs={4}>
                  <img
                    src={Think}
                    alt="logo"
                    style={{
                      float: 'left',
                      marginLeft: '15px',
                      marginRight: '20px',
                      width: '72%'
                    }}
                  />
                </Grid>
                  <Grid item xs={8}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText}
                    color="primary"
                  >
                    <FormattedMessage
                      id="request.management.report.incidents"
                      defaultMessage={"Submit a request"}
                    />
                  </Typography>
                </Grid>
               </Grid>
                
                  
                  
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.card2}>
            <Link to="/report/status">
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                <Grid direction="raw" container spacing={1}>
                  <Grid item xs={2}>
                  <img
                    src={Check}
                    alt="logo"
                    style={{
                      // maxWidth: '52%',
                      float: 'left',
                      marginLeft: '15px',
                      marginRight: '20px',
                      width: '82%'
                    }}
                  />
                </Grid>
                  <Grid item xs={10}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    className={classes.cardText2}
                    color="primary"
                  >
                    <FormattedMessage
                      id="request.management.check.incident.status"
                      defaultMessage={"Check request status"}
                    />
                  </Typography>
                </Grid>
               </Grid>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      </Grid>
      <Grid
      container
      spacing={24}
      alignItems="center"
      justify="center"
      
      // style={{ minHeight: "80vh" }}
    >
      <Grid className={classes.footer} item xs={12}>
        <Typography
          variant="h5"
          component="h5"
          className={classes.bottomText}
          color="primary"
        >
           Registered user  -
          <Button color="primary" className={classes.button} href="/sign-in">
          Sign In
          </Button>
        </Typography>
      </Grid>
    </Grid>
     
      </Fragment>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);