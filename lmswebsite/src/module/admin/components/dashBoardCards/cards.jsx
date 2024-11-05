import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { CardBlockWrap } from "./cards.styles";
import { BlockTitle } from "../../../../style/DefaultStyles/DefaultStyles";

const Cards = ({ cardsData }) => {
  return (
    <CardBlockWrap>
      {/* <div className="block-head">
        <BlockTitle className="block-title">Statistics</BlockTitle>
      </div> */}
      <Grid container spacing={3}>
        {cardsData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className="dashboard-card">
              <CardContent className="card-content">
                <Box
                  className="card-icon"
                  style={{ backgroundColor: card.background }}
                >
                  <img
                    src={card.iconPath}
                    alt={`${card.title} Icon`}
                    className="icon-image"
                  />
                </Box>
                <Box className="card-info">
                  <Typography className="card-title">{card.title}</Typography>
                  <Typography className="card-count">{card.count}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CardBlockWrap>
  );
};

export default Cards;
