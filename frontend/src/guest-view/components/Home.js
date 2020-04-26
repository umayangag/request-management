import React from "react";


import "../../app/Logo/BgImg.css";
import Check from "../../static/img/ttp.png";
import Grid from "@material-ui/core/Grid";





const Home = () => {
  return (
    <div  >
        <Grid className="bg-container" id="home" container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
            <div className="container"/>
            <h1 className="home-title" data-aos="zoom-in">
                It is a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout.
                </h1>
                <h5
                data-aos="fade-up"
                data-aos-easing="ease"
                data-aos-delay="400"
                className="sub-title"
                >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
            </h5>
            </Grid> */}
            <Grid  item md={6} lg={6} sm={12}>
           
            </Grid>
            <Grid  item md={6} lg={6} sm={12}>
            <img
                    src={Check}
                    alt="logo"
                    style={{
                      float: 'right',
                    //   marginLeft: '150px',
                    //   marginRight: '20px',
                      marginTop: '20px',
                      width: '72%',
                    //   position: 'sticky',
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
