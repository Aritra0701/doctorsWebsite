import React from "react";
import { useDispatch } from "react-redux";
import { fetchServicesData } from "../API/Functions/AllServices.API";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import Loading from "../Layout/Loading";
import BreadCrumbs from "../Layout/BreadCrumbs";

const Services = ({ withLayout = true }) => {
  const dispatch = useDispatch();

  const fetchService = async () => {
    const response = await dispatch(fetchServicesData());
    return response.payload.data;
  };

  const { data: services, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: fetchService,
  });

  const serviceContent = (
    <section className="pricing-table section">
      <Container>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            We Provide You The Best Treatment In Reasonable Price
          </Typography>
          <img src="img/section-img.png" alt="#" />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
            aliquet. pretiumts
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {services?.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={`https://doctor-service.onrender.com/${service.image}`}
                  alt={service.departmentName}
                  sx={{ objectFit: "fill", height: "15rem" }}
                />
                <CardContent>
                  <Typography variant="h6" component="h4" gutterBottom>
                    {service.departmentName}
                  </Typography>
                  <Typography variant="body2">
                    {service.description.slice(0, 100)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );

  if (withLayout) {
    return isLoading ? <Loading /> : <><BreadCrumbs data="Service" />{serviceContent}</>;
  } else {
    return <>{serviceContent}</>;
  }
};

export default Services;
