import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Projects from './Pages/Projects';
import AboutUs from './Pages/AboutUs';
import BookingForm from './Pages/BookingForm';
import ContactUs from './Pages/ContactUs';
import OrderTShirtFormPage from './Pages/OrderTShirtFormPage';

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
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
