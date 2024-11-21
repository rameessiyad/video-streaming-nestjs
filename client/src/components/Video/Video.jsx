/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Container,
  Grid,
  CardActionArea,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Video = ({ setLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoId] = React.useState(id);
  const [videoInfo, setVideoInfo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/video?id=${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVideoInfo(response.data);
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
        navigate("/");
      }
    };
    fetchVideo();
  }, [videoId, navigate, setLoggedIn]);

  return (
    <Container>
      <Grid item xs={12} md={12} marginTop={2}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <video autoPlay controls width="200">
                <source
                  src={`http://localhost:5000/video/${videoId}`}
                  type="video/mp4"
                />
              </video>
            </CardContent>
          </Card>
        </CardActionArea>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
              Created by:{videoInfo.createdBy?.fullname}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
              Created: {videoInfo.uploadDate}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5">{videoInfo.title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Video;
