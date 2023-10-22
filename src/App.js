import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Projects from './Pages/Projects';
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/OurProjects" element={<Projects/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
