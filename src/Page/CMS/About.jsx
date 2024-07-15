// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// import { useQuery } from '@tanstack/react-query';
// import {
//   Container,
//   Grid,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import Layout from '../../Layout/Layout';
// import { fetchDepartmentData, fetchDepartmentWiseDoctorData } from '../../API/Functions/AllDepartment.API';
// import Loading from '../../Layout/Loading';

// const About = () => {
//   const dispatch = useDispatch();
//   const [departmentDoctors, setDepartmentDoctors] = useState([]);

//   const fetchDepartment = async () => {
//     const response = await dispatch(fetchDepartmentData());
//     return response.payload.data;
//   };

//   const { data: departments, isLoading: isLoadingDepartments } = useQuery({
//     queryKey: ['departments'],
//     queryFn: fetchDepartment,
//   });
// console.log(departments);
//   useEffect(() => {
//     const fetchAllDepartmentWiseDoctors = async () => {
//       if (departments) {
//         const allDoctors = await Promise.all(
//           departments.map(async (department) => {
//             const response = await dispatch(fetchDepartmentWiseDoctorData(department._id));
//             return { departmentName: department.departmentName, doctors: response.payload.data };
//           })
//         );
//         setDepartmentDoctors(allDoctors);
//       }
//     };

//     fetchAllDepartmentWiseDoctors();
//   }, [departments, dispatch]);

//   console.log(departmentDoctors);
//   if (isLoadingDepartments) {
//     return (
//       <Layout>
//         <Container>
//          <Loading/>
//         </Container>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Container>
//         {departmentDoctors.map((dept) => (
//           <Box key={dept.departmentName} sx={{ mb: 4 }}>
//             <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
//               {dept.departmentName}
//             </Typography>
//             <Grid container spacing={4}>
//               {dept.doctors.map((doctor) => (
//                 <Grid item xs={12} md={4} key={doctor.id}>
//                   <Card sx={{ height: '100%' }}>
//                     <CardMedia
//                       component="img"
//                       image={`https://doctor-service.onrender.com/${doctor.image}`}
//                       alt={doctor.name}
//                       sx={{ objectFit: 'fill', height: '15rem' }}
//                     />
//                     <CardContent>
//                       <Typography variant="h6" component="h4" gutterBottom>
//                         {doctor.name}
//                       </Typography>
//                       <Typography variant="body2">
//                         {doctor.specialization}
//                       </Typography>
//                       <Typography variant="body2">
//                         {doctor.description.slice(0,100)}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         ))}
//       </Container>
//     </Layout>
//   );
// };

// export default About;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useQueries, useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';
import Layout from '../../Layout/Layout';
import { fetchDepartmentData, fetchDepartmentWiseDoctorData } from '../../API/Functions/AllDepartment.API';
import Loading from '../../Layout/Loading';
import BreadCrumbs from '../../Layout/BreadCrumbs';

const About = () => {
  const dispatch = useDispatch();

  const fetchDepartment = async () => {
    const response = await dispatch(fetchDepartmentData());
    return response.payload.data;
  };

  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartment,
  });

  const doctorQueries = useQueries({
    queries: (departments || []).map(department => ({
      queryKey: ['doctors', department._id],
      queryFn: async () => {
        const response = await dispatch(fetchDepartmentWiseDoctorData(department._id));
        return { departmentName: department.departmentName, doctors: response.payload.data };
      },
      enabled: !!departments
    }))
  });

  const isLoadingDoctors = doctorQueries.some(query => query.isLoading);

  if (isLoadingDepartments || isLoadingDoctors) {
    return (
      <Layout>
        <Container>
          <Loading />
        </Container>
      </Layout>
    );
  }

  const departmentDoctors = doctorQueries.map(query => query.data).filter(Boolean);

  return (
    <Layout>
        <BreadCrumbs data="About Us" />
      <Container>
        {departmentDoctors.map(dept => (
          <Box key={dept.departmentName} sx={{ mb: 4 }}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              {dept.departmentName}
            </Typography>
            <Grid container spacing={4}>
              {dept.doctors.map(doctor => (
                <Grid item xs={12} md={4} key={doctor.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      image={`https://doctor-service.onrender.com/${doctor.image}`}
                      alt={doctor.name}
                      sx={{ objectFit: 'fill', height: '15rem' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h4" gutterBottom>
                        {doctor.name}
                      </Typography>
                      <Typography variant="body2">
                        {doctor.specialization}
                      </Typography>
                      <Typography variant="body2">
                        {doctor.description.slice(0, 100)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

export default About;
