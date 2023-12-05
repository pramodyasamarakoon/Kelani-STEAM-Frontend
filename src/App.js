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
        <Route path="/AdminHome" element={<AdminHome/>} />
        <Route path="/Admin/Home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
