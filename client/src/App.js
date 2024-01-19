import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import BookList from './components/BookList';
import BookCreater from './components/BookCreater';
import AddUser from './components/AddUser';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/AddUser' element={<AddUser/>}/>
      <Route path='/booklist' element={<BookList/>}/>
      <Route path='/createbook/:id' element={<BookCreater/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
