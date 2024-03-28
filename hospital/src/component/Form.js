import React, { useState } from 'react'
import './Form.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'wc-toast'


const Form = () => {

    const[formData,setFormData] = useState({
        // Personla details
        names:'',
        age:null,
        gender:'',
        contact:'',

        // Complete blood count
        WBC:null,
        RBC:null,
        Hemoglobin:null,
        MCV:null,
        MCH:null,
        Haemotocrit:null,
        MCHC:null,
        RDW:null,
        Paltelet:null,
        MPV:null,
        Neutrophils:null,
        Lymphocytes:null,
        Monocytes:null,
        
        // Electrolytes
        Sodium:null,
        Pottasium:null,
        Chloride:null,
        Bicarbonate:null,
        Calcium:null,
        Phosphorus:null,

        // Liver function Test
        Total_Bilirubin:null,
        Direct_Bilirubin:null,
        Indirect_Bilirubin:null,
        SGOT:null,
        SGPT:null,
        Alkaline_Phosphate:null,
        Total_Protein:null,
        Albumin:null,
        Globumin:null,

        // Lipid Profile
        Total_Cholestrol:null,
        Triglycerides:null,
        LDL_Cholestrol:null,
        HDL_Cholestrol:null,
        Non_HDL_Cholestrol:null,
        VLDL_Cholestrol:null,

        // Urine Analysis
        Albumin_urine:'',
        Sugar:'',
        Pus_Cell:'',
        Epithelial_Cell:null,
        RBCC:null,
        Crystal:null,

        // Diabetes Profile
        Fasting_Blood_Sugar:null,
        Post_Prandial_Blood:null,
        Random_Blood_Sugar:null,
        HABC:null,
        CPR:null,

        //reneal Function Test
        Blood_Area:null,
        Serum_Creatinine:null,
        Serum_Uricacid:null,

        //doc name
        doc_name:''


    });

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        // Display confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to submit the form?");

        // Check if the user confirmed
        if (isConfirmed) {
            if(formData.contact.length === 10){
                if(formData.age >=0 && formData.age <= 110){
                    axios.post('https://hospital-web-app-aqvg.vercel.app/reports', formData)
                        .then(res => {
                            navigate('/pdf', {state : {formData : formData}})
                            toast.success('Data Added Successfully')
                        })
                        .catch(err => toast.error(err));
                }else{
                    toast.error('Invalid age')
                }
            }else{
                toast.error('Invalid Contact Number');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value 
        });
    };

  return (
    <div>
        <div className='body1'>
            <wc-toast></wc-toast>
            <div className="main-form">
                <form onSubmit={handleSubmit}>
                    <div className="txt-field">
                        <h2>PERSONAL DETAILS</h2>
                    </div>
                    <div className="personal">
                        
                        <div className="personal-fields">
                            <label>Name<span className='red'>*</span></label>
                            <input type="text" name="names" onChange={handleChange} required/>
                        </div>
                        <div className="personal-fields">
                            <label>Age<span className='red'>*</span></label>
                            <input type="number" name="age" onChange={handleChange} required/> 
                        </div>
                        <div className="personal-fields">
                            <label>Gender<span className='red'>*</span></label>
                            <select className="select-option"  name="gender" onChange={handleChange}  required>
                                <option>Select</option>
                                <option value="Male" >Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="personal-fields">
                            <label>Contact No<span className='red'>*</span></label>
                            <input type="number" name="contact" onChange={handleChange} required/>
                        </div>
                        
                    </div>
                    <div className="reports">
                        <div className="txt-field">
                            <h2>REPORT</h2>
                        </div>
                    
                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Complete Blood Count</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Total Count(wbc)</label>
                                    <input type="number" min="0" 
        max="100000" step="0.1" name="WBC" onChange={handleChange} />
                                </div>
                                <div className="fields-all2">
                                    <label>Red Blood Cell</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="RBC" onChange={handleChange} />
                                </div>
                                <div className="fields-all2">
                                    <label>Hemoglobin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Hemoglobin" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Mean Corpuscular Volume(MCV)</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="MCV" onChange={handleChange} />
                                </div>
                                <div className="fields-all2">
                                    <label>Mean Corpuscular Hemoglobin(MCH)</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="MCH" onChange={handleChange} />
                                </div>
                                <div className="fields-all2">
                                    <label>Haemotocrit</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Haemotocrit" onChange={handleChange}/>
                                </div>  
                                <div className="fields-all2">
                                    <label>Mean Corpuscular Hemoglobin Concentration</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="MCHC" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Red Cell Distribution Width</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="RDW" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Paltelet Count</label>
                                    <input type="number" min="0" 
        max="100000" step="0.1" name="Paltelet" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Mean Platelet Volume(MPV)</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="MPV" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Neutrophils</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Neutrophils" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Lymphocytes</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Lymphocytes" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Monocytes</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Monocytes" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>



                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Electrolytes</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Sodium</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Sodium" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Pottasium</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Pottasium" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Chloride</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Chloride" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Bicarbonate</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Bicarbonate" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Calcium</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Calcium" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Phosphorus</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Phosphorus" onChange={handleChange}/>
                                </div>
                            </div>
                            
                        </div>



                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Liver Function Test</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Total Bilirubin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Total_Bilirubin" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Direct Bilirubin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Direct_Bilirubin" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Indirect Bilirubin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Indirect_Bilirubin" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>SGOT</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="SGOT" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>SGPT</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="SGPT" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Alkaline Phosphate</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Alkaline_Phosphate" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Total Protein</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Total_Protein" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Albumin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Albumin" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Globumin</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Globumin" onChange={handleChange}/>
                                </div>
                            </div>
                            
                        </div>



                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Lipid Profile</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Total Cholestrol</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Total_Cholestrol" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Triglycerides</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Triglycerides" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>LDL Cholestrol</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="LDL_Cholestrol" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>HDL Cholestrol</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="HDL_Cholestrol" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Non-HDL Cholestrol</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Non_HDL_Cholestrol" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>VLDL Cholestrol</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="VLDL_Cholestrol" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>



                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Urine Analysis</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Albumin</label>
                                    <select className="select-option"  name="Albumin_urine" onChange={handleChange}  >
                                        <option>Select</option>
                                        <option value="+1" >+1</option>
                                        <option value="+2">+2</option>
                                        <option value="+3">+3</option>
                                        <option value="+4">+4</option>
                                        <option value="trace">trace</option>
                                        <option value="nil">nil</option>
                                    </select>
                                </div>
                                <div className="fields-all2">
                                    <label>Sugar</label>
                                    <select className="select-option"  name="Sugar" onChange={handleChange}  >
                                        <option>Select</option>
                                        <option value="+1" >+1</option>
                                        <option value="+2">+2</option>
                                        <option value="+3">+3</option>
                                        <option value="+4">+4</option>
                                        <option value="trace">trace</option>
                                        <option value="nil">nil</option>
                                    </select>
                                </div>
                                <div className="fields-all2">
                                    <label>Pus Cell</label>
                                    <select className="select-option"  name="Pus_Cell" onChange={handleChange}  >
                                        <option>Select</option>
                                        <option value="2-3" >2-3</option>
                                        <option value="5-10">5-10</option>
                                        <option value="10-15">10-15</option>
                                        <option value="15-20">15-20</option>
                                    </select>
                                </div>
                                <div className="fields-all2">
                                    <label>Epithelial Cell</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Epithelial_Cell" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>RBC</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="RBCC" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Crystal</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Crystal" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>


                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Diabetes Profile</h4>
                            </div>
                            <div className="report-fields2">
                            
                                <div className="fields-all2">
                                    <label>Fasting Blood Sugar</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Fasting_Blood_Sugar" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Post-Prandial Blood</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Post_Prandial_Blood" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>Random Blood Sugar</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="Random_Blood_Sugar" onChange={handleChange}/>
                                </div>
                                <div className="fields-all2">
                                    <label>HBA1C</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="HABC" onChange={handleChange}/>
                                </div>
                                {/* <div className="fields-all2">
                                    <label>CPR</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1" name="CPR" onChange={handleChange}/>
                                </div> */}
                            </div>
                        </div>

                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Renal Function Test</h4>
                            </div>
                            <div className="report-fields">
                            
                                <div className="fields-all">
                                    <label>Blood Urea</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Blood_Area" onChange={handleChange}/>
                                </div>
                                <div className="fields-all">
                                    <label>Serum Creatinine</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Serum_Creatinine" onChange={handleChange}/>
                                </div>
                                <div className="fields-all">
                                    <label>Serum Uricacid</label>
                                    <input type="number" min="0" 
        max="5000" step="0.1"name="Serum_Uricacid" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="reports2">
                            <div className="txt-field2">
                                <h4>Reference</h4>
                            </div>
                            <div className="report-fields">
                            
                                <div className="fields-all">
                                    <label>Doctor Name</label>
                                    <input type="text" name="doc_name" onChange={handleChange} required/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="submition-btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Form
