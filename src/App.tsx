import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import List from './pages/List';
import RedirectToUsers from './components/RedirectToUsers';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RedirectToUsers />} />
          <Route path='/users' element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
