import { BrowserRouter, Routes, Route } from 'react-router-dom'; //eslint-disable-line
import logo from './assets/images/logo.png'; // eslint-disable-line
import links from './assets/json/categories.json';
import Navbar from './components/Navbar'; // eslint-disable-line
import Home from './pages/Home'; //eslint-disable-line
import './App.css';

function App () {
  return (
    <BrowserRouter>
      <Navbar logo={logo} links={links}/>
      <Routes>
        <Route exac path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
