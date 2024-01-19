import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
}
const GetBookCreatorName = ({ authorId }) => {
  const [name, setName] = useState('')
  useEffect(() => {
    axios.get(`http://localhost:8000/auth/get-user/${authorId}`, config).then(data => setName(data.data.user)).catch(e => console.log(e))
  }, [])
  return <td>{name}</td>
}

const BookList = () => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()
  const getAllBooks = async () => {
    await axios.get('http://localhost:8000/book', config).then(data => {
      console.log(data);
      setBooks(data.data.books);
    }).catch((e) => {
      console.log(e);
    })
  }

  const get10minearlier = async () => {
    await axios.get('http://localhost:8000/book?new=1',config).then(data => {
      setBooks(data.data.books);
    }).catch((e) => {
      console.log(e);
    })
  }

  const get10minAfter = async () => {
    await axios.get('http://localhost:8000/book?old=1',config).then(data => {
      setBooks(data.data.books);
    }).catch((e) => {
      console.log(e);
    })
  }
  const deleteBook = async ( id ) => {
    await axios.delete(`http://localhost:8000/book/delete/${id}`, config).then(data => {
      console.log(data);
      getAllBooks()
    }).catch((e) => {
      console.log(e);
    })
  }

  useEffect(() => {
    getAllBooks()
  }, [])
  const logOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('role')
    navigate('/')
  }
  return (
    <>
      <div className="App">
        <div className='button_container'>
          <button onClick={() => navigate('/adduser')} > <i className="fa-solid fa-plus"></i> Create a User</button>
          <button onClick={() => navigate('/createbook/create')} > <i className="fa-solid fa-plus"></i> Create a Book</button>
          <button onClick={getAllBooks}>View All Books</button>
          <button onClick={get10minearlier}>Within 10 min</button>
          <button onClick={get10minAfter}>Before 10 min</button>
          <button onClick={logOut} >LogOut</button>
        </div>
        <br />
        <table>
          <thead>
            <tr id="heading">
              <th>Book Name</th>
              <th>Content</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Created At</th>
              {localStorage.getItem('role') === "CREATOR" ? <th>Edit </th> : null}
              {localStorage.getItem('role') === "CREATOR" ? <th>Delete </th> : null}

            </tr>
          </thead>

          <tbody>
            {books?.length
              ? books?.map((post) => (
                <tr key={post.id}>
                  <td>{post?.title}</td>
                  <td>{post?.content}</td>
                  <td>{post?.description}</td>
                  <GetBookCreatorName authorId={post?.authorId} />
                  <td>{post?.created_at}</td>
                  {localStorage.getItem('role') === "CREATOR" ? <td><i className="fa-solid fa-pen-to-square" onClick={() => navigate(`/createbook/${post?._id}`)}></i></td> : null}
                  {localStorage.getItem('role') === "CREATOR" ? <td><i className="fa-solid fa-trash" onClick={() => deleteBook(post._id)}></i></td> : null}
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default BookList