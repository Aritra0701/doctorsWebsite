import React from "react";
import { useDispatch } from "react-redux";
import { fetchDoctorData } from "../API/Functions/Doctor.APi";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CssBaseline,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AllDoctors = () => {
  const dispatch = useDispatch();
  
  const fetchDoctors = async () => {
    const response = await dispatch(fetchDoctorData());
    return response.payload.data;
  };

  const { data: doctors, isLoading } = useQuery({
    queryKey: ["allDocs"],
    queryFn: fetchDoctors,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
             <h1 style={{display:'flex',justifyContent:'center'}}>Meet Our Specialist</h1>
            <Slider {...settings}>
              {doctors?.map((doctor) => (
                <Card key={doctor.id} sx={{ maxWidth: 340, margin: '2rem' }}>
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      image={`https://doctor-service.onrender.com/${doctor.image}`}
                      alt={doctor.name}
                      sx={{ objectFit: 'cover', height: '15rem' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {doctor.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {doctor.department_details[0].departmentName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doctor.description.slice(0, 100)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Slider>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default AllDoctors;
