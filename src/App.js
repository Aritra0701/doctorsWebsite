import logo from './logo.svg';
import Header from './Layout/Header';
import Home from './Page/CMS/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Services from './Page/CMS/Service';
import About from './Page/CMS/About';
import Blogs from './Page/CMS/Blogs';
import BlogDetails from './Page/CMS/BlogDetails';
import Login from './Page/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Register from './Page/Auth/Register';
import Contact from './Page/CMS/Contact'
import SelectService from './Page/CMS/Appointment/SelectService';
import SelectDoctor from './Page/CMS/Appointment/SelectDoctor';
import SingleDoctor from './Page/CMS/Appointment/SingleDoctor';
import Appointment from './Page/CMS/Appointment/Appointment';
const queryClient = new QueryClient()

function App() {

const private_route=[
  {
    path:'/select-service',
    component:<SelectService/>
  },
  {
    path:'/select-doctor/:id',
    component: <SelectDoctor/>
  },
  {
    path:'/doctor-details/:id',
    component:<SingleDoctor/>
  },
  {
    path:'/appointment/:id',
    component: <Appointment/>
  }
]
const public_route=[
  {
    path:'/',
    component: <Home/>
  },
  {
    path:'/about',
    component: <About/>
  },
  {
    path:'/services',
    component: <Services/>
  },
  {
    path:'/blogs',
    component: <Blogs/>
  },
  {
    path:'/blogDetail/:id',
    component: <BlogDetails/>
  },
  {
    path:'/login',
    component: <Login/>
  },
  {
    path:'/register',
    component: <Register/>
  },
  {
    path:'/contact',
    component: <Contact/>
  }
]

  return (
 <>
   <QueryClientProvider client={queryClient}>
    <ToastContainer/>
    <Router>
      <Routes>
      {
        public_route?.map((item,index)=><Route key={index} path={item.path} element={item.component} />)
      },
       {
        private_route?.map((item,index)=><Route key={index} path={item.path} element={item.component} />)
      }
      </Routes>
    </Router>
 </QueryClientProvider>
 </>
  );
}

export default App;
