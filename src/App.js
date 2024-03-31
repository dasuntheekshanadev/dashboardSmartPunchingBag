import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Data from './components/Data';
import NavBar from './components/NavBar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Chart from './components/Chart';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
        <Footer />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}

export default App;
