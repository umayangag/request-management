import React from "react";
import "../../app/Logo/BgImg.css";
import Check from "../../static/img/ttp.png";
import Grid from "@material-ui/core/Grid";


const Home = () => {
  return (
    <div  >
        <Grid className="bg-container" id="home" container spacing={2}>
            <Grid  item md={6} lg={6} sm={12}>
           
            </Grid>
            <Grid  item md={6} lg={6} sm={12}>
            <img
                    src={Check}
                    alt="logo"
                    style={{
                      float: 'right',
                      marginBottom: '20px',
                      width: '72%',
                      zIndex:50
                    }}
                  />
            </Grid>
        </Grid>
        
      <div className="bg-overlay" />
      </div>
  );
};

export default Home;
