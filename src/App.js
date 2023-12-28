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
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
