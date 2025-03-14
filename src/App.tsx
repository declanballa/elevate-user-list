import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import List from './pages/List';
import RedirectToUsers from './components/RedirectToUsers';
import Profile from './pages/Profile';
import Carousel from './pages/Carousel';

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <a href='/users'>User List</a>
        <a href='/users/carousel'>Carousel</a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RedirectToUsers />} />
          <Route path='/users' element={<List />} />
          <Route path='/users/:id' element={<Profile />} />
          <Route path='/users/carousel' element={<Carousel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
