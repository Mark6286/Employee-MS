import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Employee = () => {
    
    const [category, setCategory] = useState([])
    category;

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

  return (
    <div className="px-5 mt-5">
        <div className="d-flex justify-content-center">
            <h3> Category List</h3>
            </div>
            <Link to='/dashboard/add_employee' className="btn btn-success">Add employee</Link>
            <div>
        </div>
    </div>
  )
}

export default Employee