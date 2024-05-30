import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Projects from './Pages/Projects';
import AboutUs from './Pages/AboutUs';
import BookingForm from './Pages/BookingForm';
import ContactUs from './Pages/ContactUs';
import OrderTShirtFormPage from './Pages/OrderTShirtFormPage';
import AdminHome from './Pages/Admin/AdminHome';
import Home from './Pages/Admin/Home';
import AdminAlbums from './Pages/Admin/AdminAlbums';
import AdminProjects from './Pages/Admin/AdminProjects';
import AdminCommittee from './Pages/Admin/AdminCommittee';
import AdminTShirt from './Pages/Admin/AdminTShirt';
import AdminUsers from './Pages/Admin/AdminUsers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/OurProjects" element={<Projects/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/BookingForm" element={<BookingForm/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/OrderTShirtFormPage" element={<OrderTShirtFormPage/>} />

        {/*  Admin */}
        <Route path="/AdminBookings" element={<AdminHome/>} />
        <Route path="/AdminAlbums" element={<AdminAlbums/>} />
        <Route path="/AdminProjects" element={<AdminProjects/>} />
        <Route path="/AdminCommittee" element={<AdminCommittee/>} />
        <Route path="/AdminTShirtOrders" element={<AdminTShirt/>} />

        {/*Super Admin */}
        <Route path='/AdminUsers' element={<AdminUsers/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
