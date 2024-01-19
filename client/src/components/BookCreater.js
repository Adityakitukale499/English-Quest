import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const BookCreater = () => {
    const { id } = useParams()
    const [book, setBook] = useState({})


    const navigate = useNavigate()
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      }
    const createABook = async () => {
        await axios.post('http://localhost:8000/book/create', {...book},config).then(data => {
          console.log(data);
          alert('creat book successfully')
          navigate('/booklist')
        }).catch((e) => {
          console.log(e);
        //   alert('')
        })
      }
      const editABook = async () => {
        await axios.put(`http://localhost:8000/book/edit-book/${id}`, {...book},config).then(data => {
          console.log(data);
          alert('edit book successfully')
          navigate('/booklist')
        }).catch((e) => {
          console.log(e);
        })
      }

      const getABook = async () => {
        console.log(id);
        await axios.get(`http://localhost:8000/book/details/${id}`,config).then(data => {
          setBook(data.data.book);
          console.log(data.data.book);
        }).catch((e) => {
          console.log(e);
        })
      } 

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!book?.title && !book?.description && !book?.content) {
            alert('please fill all feilds')
            return;
        }
        const temp = book
        temp['created_at'] = new Date().getTime()
        setBook(temp)
        console.log(book);
        if (id == 'create') {
            createABook()

        } else {
            editABook()
        }
    }
    const handleChange = event => {
        event.persist();
        setBook(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };
    useEffect(() => {
        if (id != 'create')  getABook();
    }, [])
    return (
        <div className='section'>
            <div className='container'>
                <h2>Create A Book</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label className="label">Book Name</label>
                        <div className="control">
                            <input
                                autoComplete="off"
                                className={`input`}
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={book.title || ''}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input
                                className={`input`}
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={book.description}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Content</label>
                        <div className="control">
                            <textarea className={`input`}
                                type="text"
                                name="content"
                                onChange={handleChange}
                                value={book.content}
                                required />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="button "
                    >
                        Submit
                    </button>

                </form>
            </div>

        </div>
    )
}

export default BookCreater