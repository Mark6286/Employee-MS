import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category: '',
        image: ''
    })

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() =>{
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result)
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => {
            console.error(err)
        })
    },[])

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in employee) {
            formData.append(key, employee[key]);
        }

        // Debugging: Log FormData content
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        axios.post('http://localhost:3000/auth/add_employee', formData)
        .then(result => {
            if(result.data.Status){
                console.error(result.data.Error)
                return;
            }
            
            navigate('/dashboard/employee');
        })
        .catch(err => console.error(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-50 border'>
        <h2 className="text-center">Add employee</h2>
        <form className='row g-1' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input type='text' name="name" autoComplete='off' placeholder='Enter Name' onChange={handleInputChange} className='form-control rounded-0' required/>
          </div>
          <div className='col-12'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' name='email' autoComplete='off' placeholder='Enter Email' onChange={handleInputChange} className='form-control rounded-0' required/>
          </div>
          <div className='col-12'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' name='password' placeholder='Enter Password' onChange={handleInputChange} className='form-control rounded-0' required/>
          </div>
          <div className='col-12'>
            <label htmlFor='salary'><strong>Salary</strong></label>
            <input type='text' name='salary' autoComplete='off' placeholder='Enter Salary' onChange={handleInputChange} className='form-control rounded-0' required/>
          </div>
          <div className='col-12'>
            <label htmlFor='address'><strong>Address</strong></label>
            <input type='text' name='address' autoComplete='off' placeholder='Enter Address' onChange={handleInputChange} className='form-control rounded-0' required/>
          </div>
          <div className='col-12'>
            <label htmlFor='category'><strong>Category</strong></label>
            <select name="category" onChange={handleInputChange} className='form-select'>
                <option value="">Select a category</option>
                {category.map(c =>{return <option key={c.id} value={c.id}>{c.name}</option>})}
            </select>
          </div> 
          <div className='col-12 mb-3'>
            <label htmlFor='inputGroupFile01'><strong>Select Image</strong></label>
            <input type='file' name='image' id='inputGroupFile01' onChange={handleFileChange} className='form-control rounded-0' required/>
          </div> 
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add employee</button>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee