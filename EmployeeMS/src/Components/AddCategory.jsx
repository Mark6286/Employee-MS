import {useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {

    const [category, setCategory] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(!result.data.Status){
                alert(result.data.Error);
                return;
            }
            navigate('/dashboard/category');
        })
        .catch(err => console.error(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2 className="text-center">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='category'><strong>Category:</strong></label>
            <input type='text' name='category' autoComplete='off' placeholder='Enter Category'  onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0' required/>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add category</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory