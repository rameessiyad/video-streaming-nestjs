/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VideoList = ({ setLoggedIn }) => {
  // eslint-disable-next-line no-unused-vars
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVideos(response.data);
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
        navigate("/");
      }
    };
  }, [navigate, setLoggedIn]);
  return (
    <Container>
      <Grid container spacing={2} marginTop={2}>
        {videos.map((video) => (
          <Grid item sx={12} md={4} key={video._id}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h1" variant="h5">
                    <Link
                      to={`/video/${video._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {video.title}
                    </Link>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {video.uploadDate}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  image={`http://127.0.0.1:3002/${video.coverImage}`}
                  alt="alt"
                />
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
