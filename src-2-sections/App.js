import './App.css';
import GlobalState from './state/globalState';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div className="App">
      <GlobalState>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </GlobalState>

    </div>
  );
}

export default App;
