import React  from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressCard} from '@fortawesome/free-regular-svg-icons'
import {faFile} from '@fortawesome/free-regular-svg-icons'
import { toast } from 'wc-toast'
// import { faUpload } from '@fortawesome/free-solid-svg-icons'

const Home = () => { 
    
    const [auth, setAuth] = useState(false);
    const msg = "Please Login";

    useEffect(() => {
        axios.get('http://localhost:3001') // Endpoint to check authentication status
            .then(res => {
                if (res.data.Status === 'Success') {
                    setAuth(true); 
                } else {
                    console.log(res.data.Message);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const navigate = useNavigate()


    const handlePatient = () => {
        if (auth) {
            navigate('/form');
        } else {
            toast.error(msg);
        }
    }
    
    const handleView=()=>{
        if(auth){
            navigate('/records')
        }else{
            toast.error(msg)
        }
    }
    // const handleUpload = () =>{
    //     if(auth){
    //         navigate('/upload')
    //     }else{
    //         toast.error(msg)
    //     }
    // }
  return (
    <div>
        <div className="main-content">
        <wc-toast></wc-toast>
            <div className="content">
                <div className="box generate-box">
                    <button onClick={handlePatient}>
                        <FontAwesomeIcon className='icon-file' icon={faAddressCard} />
                        <h5>Add Patient Details</h5>
                    </button>
                    
                </div>
                <div className="box view-box">
                    <button onClick={handleView}>
                        <FontAwesomeIcon className='icon-file' icon={faFile} />
                        <h5>View Patient Records</h5>
                    </button>
                </div>
                {/* <div className="box upload-box">
                    <button onClick={handleUpload}>
                    <FontAwesomeIcon className='icon-file' icon={faUpload} />
                        <h5>upload Files</h5>
                    </button>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Home
