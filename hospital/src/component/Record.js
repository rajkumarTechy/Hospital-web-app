import React, { useEffect, useState } from 'react'
import './Record.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Record = () => {

    const[personalData,setPersonalData] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/records')
        .then(res=>setPersonalData(res.data))
        .catch(err=>(console.log(err)))
    },[])


  return (
    <div>
        <div className='body'>
            <div className="patient-record">
                <div class="record-txt">
                    <h3>Patients Record Table</h3>
                </div>
                <div className="search">
                    <div className="search-box">
                        <input type="text" placeholder="Search"/> 
                        <button>
                            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                        </button>
                        
                    </div>
                </div>
                <div className="tables">
                    <table>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Name</th>
                                <th>Date Of Birth</th>
                                <th>Contact No.</th>
                                <th>Date Added</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                personalData.map((data,index)=>{
                                    return <tr key={index}>
                                                <td>{data.id}</td>
                                                <td>{data.names}</td>
                                                <td>{data.age}</td>
                                                <td>{data.contact}</td>
                                                <td>{data.date_added}</td>
                                                <td>
                                                    <div className="btn">
                                                        <button type="submit" className="update">Update</button>
                                                        <button type="submit" className='view-btn'>Download</button>
                                                    </div>
                                                </td>
                                            </tr>
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Record
