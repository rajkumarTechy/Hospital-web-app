import React, { useEffect, useState } from 'react'
import './Pdf.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import axios from 'axios'


import logo from './logo.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

const Pdf = () => {

    const [currentDateTime] = useState(new Date());
    const [latestPid, setLatestPid] = useState([]);
    const formattedDateTime = currentDateTime.toLocaleString();

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/latest-pid')
            .then(res => {

                    setLatestPid(res.data.maxId);
                    
            })
            .catch(err => {
                console.error('Error fetching latest PID:', err);
            });
    }, []);

    const calculateDynamicValue = () => {
            
        if (formData.HABC < 7.0) {
            return "Good Control";
        } else if(formData.HABC >= 7.1 && formData.HABC <= 8.0){
            return "Sub-Optimal Control";
        } else if(formData.HABC >= 8.1 && formData.HABC <= 9.0){
            return "Poor Control";
        } else{
            return "Very Poor"
        }
        
    };

    const {state} = useLocation()

    const{formData} = state;

    const Complete_bld_ct = formData.WBC || formData.RBC || formData.Hemoglobin || formData.MCV || formData.MCH || formData.Haemotocrit || formData.MCHC || formData.RDW || formData.Paltelet || formData.MPV || formData.Neutrophils || formData.Lymphocytes || formData.Monocytes;

    const Electrolyte = formData.Sodium || formData.Pottasium || formData.Chloride || formData.Bicarbonate || formData.Calcium || formData.Phosphorus;

    const lvr_function = formData.Total_Bilirubin || formData.Direct_Bilirubin || formData.Indirect_Bilirubin || formData.SGOT || formData.SGPT || formData.Alkaline_Phosphate || formData.Total_Protein || formData.Albumin || formData.Globumin; 

    const Lipid = formData.Total_Cholestrol || formData.Triglycerides || formData.LDL_Cholestrol || formData.HDL_Cholestrol || formData.Non_HDL_Cholestrol || formData.VLDL_Cholestrol;

    const Urine = formData.Albumin_urine || formData.Sugar || formData.Pus_Cell || formData.Epithelial_Cell || formData.RBC_Crystal;

    const Diabetes_pro = formData.Fasting_Blood_Sugar || formData.Post_Prandial_Blood || formData.Random_Blood_Sugar || formData.HABC || formData.CPR;

    const renel = formData.Blood_Area || formData.Serum_Creatinine || formData.Serum_Uricacid;


    const handlePrint = (fileName) => {
        const pdfs = document.querySelector('.main-frame');

        pdfs.style.width = "100%";
        pdfs.style.border = "none";
        
        
        
        var opt = {
            margin: [0, 0],
            filename: fileName+'.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        html2pdf().from(pdfs).set(opt).save();

        setTimeout(() => {
            pdfs.style.width = "65%";
            pdfs.style.border = "1px solid #ccc";
        }, 100);


        navigate('/')
        
    }
    
  return (
    <div className='body8'>
         <wc-toast></wc-toast>
        <div className="main-frame" id="pdf">
            <div className="main-detail">
                <div className="logo-icon">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="doc-detail">                
                    <h1>SRI KRISHNA <span>DIAGNOSTICS</span></h1>
                    <ul>
                        <li>Accurate</li>
                        <li>Caring</li>
                        <li>Instant</li>
                    </ul>
                    <h4>95A, Ettayapuram Road, kovilpatti-628501</h4>
                </div>
                <div className="contact">
                    <div className="cont-detail phone">
                        <FontAwesomeIcon className='phone' icon={faPhone} />
                        <h3>6383739884</h3>
                    </div>
                    <div className="cont-detail mail">
                        <FontAwesomeIcon className='envelope' icon={faEnvelope} />   
                        <h3>kovilpattikidneycentre@gmail.com</h3> 
                    </div>
                    
                </div>
                
                
            </div>
            
            <div className="patient-main">
                <div className="patient-detail">
                    <h2>{formData.names}</h2>
                    <h5>Age : {formData.age}</h5>
                    <h5>Gender : {formData.gender}</h5>
                    <h5 >PID : {latestPid}</h5>
                </div>
                <div className="collect-detail">
                    <h3>Sample Collected At:</h3>
                    <h4>Sri Krishna Diagnostics</h4>
                    <h2>Ref. By :</h2>
                </div>
                <div className="date">
                    <h5>Collected On :{formattedDateTime}</h5>
                    <h5>Dispatched On :{formattedDateTime}</h5>
                </div>
            </div>
            <div className="main-table">
                <h2>Final Test Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: "35%"}}>Investigation</th>
                            <th style={{width: "25%"}}>Result</th>
                            <th>Reference Value</th>
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Primary Sample Type:</td>
                            <td colspan="3">Blood</td>
                            
                        </tr>
                        {Complete_bld_ct && <tr className="head-div">
                            <th colspan="4">Complete Blood Count(CBC)</th>
                        </tr>}
                        {formData.WBC && (
                            <tr>
                                <td>Total Count(WBC)</td>
                                <td>{formData.WBC}</td>
                                <td className="result-column">
                                    <span className="result-value">4000 - 11000</span>
                                </td>
                                <td>g/dL</td>
                            </tr>
                        )}
                        {formData.RBC && (
                            <tr>
                                <td>Red Blood Cell</td>
                                <td>{formData.RBC}</td>
                                <td>4.6-5.9</td>
                                <td>million</td>
                            </tr>
                        )}
                        {formData.Hemoglobin && (
                            <tr>
                                <td>Hemoglobin</td>
                                <td>{formData.Hemoglobin}</td>
                                <td className="result-column">
                                    <span className="result-value">13 - 18</span>
                                </td>
                                <td>g/dl</td>
                            </tr>
                        )}
                        {formData.MCV && (
                            <tr>
                                <td>Mean Corpuscular Volume(MCV)</td>
                                <td>{formData.MCV}</td>
                                <td>80 - 100</td>
                                <td>fL</td>
                            </tr>
                        )}
                        {formData.MCH && (
                            <tr>
                                <td>MCH</td>
                                <td>{formData.MCH}</td>
                                <td>27 - 32</td>
                                <td>pg</td>
                            </tr>
                        )}
                        {formData.MCHC && (
                            <tr>
                                <td>MCHC</td>
                                <td>{formData.MCHC}</td>
                                <td>32 - 36</td>
                                <td>%</td>
                            </tr>
                        )}
                        {formData.Haemotocrit && (
                            <tr>
                                <td>Haemotocrit</td>
                                <td>{formData.Haemotocrit}</td>
                                <td>45</td>
                                <td>%</td>
                            </tr>
                        )}
                        {formData.RDW && (
                            <tr>
                                <td>RDW</td>
                                <td>{formData.RDW}</td>
                                <td>11 - 15</td>
                                <td>cumm</td>
                            </tr>
                        )}
                        {formData.Paltelet && (
                            <tr>
                                <td>Platelet Count</td>
                                <td>{formData.Paltelet}</td>
                                <td>150 - 400 x10<sup>9</sup></td>
                                <td>%</td>
                            </tr>
                        )}
                        {formData.MPV && (
                            <tr>
                                <td>Mean Platelet Volume(MPV)</td>
                                <td>{formData.MPV}</td>
                                <td>6 - 12</td>
                                <td>fl</td>
                            </tr>
                        )}
                        {formData.Neutrophils && (
                            <tr>
                                <td>Neutrophils</td>
                                <td>{formData.Neutrophils}</td>
                                <td>2 - 8 x10<sup>9</sup></td>
                                <td>%</td>
                            </tr>
                        )}
                        {formData.Lymphocytes && (
                            <tr>
                                <td>Lymphocytes</td>
                                <td>{formData.Lymphocytes}</td>
                                <td>1 - 4 x10<sup>9</sup></td>
                                <td>%</td>
                            </tr>
                        )}
                        {formData.Monocytes && (
                            <tr>
                                <td>Monocytes</td>
                                <td>{formData.Monocytes}</td>
                                <td>0 - 1.0 x10<sup>9</sup></td>
                                <td>%</td>
                            </tr>
                        )} 
                        {Urine && <tr className="head-div">
                            <th colspan="4">Urin Analysis</th>
                        </tr>}
                        {formData.Albumin_urine && (
                            <tr>
                                <td>Albumin</td>
                                <td>{formData.Albumin_urine}</td>
                                <td>NIL</td>
                                <td>cumm</td>
                            </tr>
                        )}
                        {formData.Sugar && (
                            <tr>
                                <td>Sugar</td>
                                <td>{formData.Sugar}</td>
                                <td>NIL</td>
                                <td>cumm</td>
                            </tr>
                        )}
                        {formData.Pus_Cell && (
                            <tr>
                                <td>Pus Cell</td>
                                <td>{formData.Pus_Cell}</td>
                                <td>&lt;5</td>
                                <td>HPF</td>
                            </tr>
                        )}
                        {formData.Epithelial_Cell && (
                            <tr>
                                <td>Epithelial</td>
                                <td>{formData.Epithelial_Cell}</td>
                                <td>&lt;5</td>
                                <td>HPF</td>
                            </tr>
                        )}
                        {formData.RBC_Crystal && (
                            <tr>
                                <td>RBC Crystal</td>
                                <td>{formData.RBC_Crystal}</td>
                                <td>&lt;5</td>
                                <td>HPF</td>
                            </tr>
                        )} 
                        {Diabetes_pro && <tr className="head-div">
                            <th colspan="4">Diabetes Profile</th>
                        </tr>}
                        {formData.Fasting_Blood_Sugar && <tr>
                            <td>Fasting Blood Sugar(FBS)</td>
                            <td>{formData.Fasting_Blood_Sugar}</td>
                            <td className="result-column">
                                <h4 className="result-indicator" style={{color: "darkred"}}>{(() => {
                                    if (formData.Fasting_Blood_Sugar >= 70 && formData.Fasting_Blood_Sugar <=90) {
                                        return "Normal";
                                    }  else if(formData.Fasting_Blood_Sugar >= 100 && formData.Fasting_Blood_Sugar <=126) {
                                        return "Pre-diabetes";
                                    } else if(formData.Fasting_Blood_Sugar > 126){
                                        return "Diabetes"
                                    }else{
                                        return ""
                                    }
                                })()}</h4>
                                <span className="result-value">{(() => {
                                    if (formData.Fasting_Blood_Sugar >= 70 && formData.Fasting_Blood_Sugar <=99) {
                                        return "70 - 99";
                                    }  else if(formData.Fasting_Blood_Sugar >= 100 && formData.Fasting_Blood_Sugar <=126) {
                                        return "100 - 126";
                                    } else if(formData.Fasting_Blood_Sugar > 126){
                                        return ">126"
                                    }else{
                                        return "-"
                                    }
                                })()}</span>
                                
                            </td> 
                            <td>mg/dl</td>
                        </tr>} 
                        {formData.Post_Prandial_Blood && <tr>
                            <td>Post-Prandial Blood Sugar (PPBS)</td>
                            <td>{formData.Post_Prandial_Blood}</td>
                            <td className="result-column">
                                <h4 className="result-indicator" style={{color: "darkred"}}>{(() => {
                                    if (formData.Post_Prandial_Blood >= 100 && formData.Post_Prandial_Blood <=140) {
                                        return "Normal";
                                    }  else if(formData.Post_Prandial_Blood >= 140 && formData.Post_Prandial_Blood <=199) {
                                        return "Pre-diabetes";
                                    } else if(formData.Post_Prandial_Blood > 199){
                                        return "Diabetes";
                                    }else{
                                        return ""
                                    }
                                })()}</h4>
                                <span className="result-value">{(() => {
                                    if (formData.Post_Prandial_Blood >= 100 && formData.Post_Prandial_Blood <=140) {
                                        return "100 - 140";
                                    }  else if(formData.Post_Prandial_Blood >= 140 && formData.Post_Prandial_Blood <=199) {
                                        return "140 - 199";
                                    } else if(formData.Post_Prandial_Blood > 200){
                                        return ">200";
                                    }else{
                                        return "-";
                                    }
                                })()}</span>

                            </td> 
                            <td>mg/dl</td>
                        </tr> }
                        {formData.Random_Blood_Sugar && <tr>
                            <td>Random Blood Sugar(RBS)</td>
                            <td>{formData.Random_Blood_Sugar}</td>
                            <td>80-120</td> 
                            <td>mg/dl</td>
                        </tr>} 
                        {formData.HABC  && <tr>
                            <td>H b A,C</td>
                            <td>{formData.HABC}</td>
                            <td className="result-column">
                                <h4 className="result-indicator" style={{color: "darkred"}}>{(() => {
                                    if (formData.HABC < 5.7 ) {
                                        return "Normal";
                                    }  else if(formData.HABC >=5.7 && formData.HABC <=6.4) {
                                        return "Pre-Diabetes";
                                    } else {
                                        return "Diabetes("+ calculateDynamicValue() + ")";
                                    }
                                })()}</h4>
                                <span className="result-value">{(() => {
                                    if (formData.HABC < 5.7 ) {
                                        return "<5.7";
                                    }  else if(formData.HABC >=5.7 && formData.HABC <=6.4) {
                                        return "5.7 - 6.4";
                                    } else {
                                        return ">6.5";
                                    }
                                })()}</span>
                            </td> 
                            <td>%</td>
                        </tr>} 
                        {formData.CPR && <tr>
                            <td>CPR</td>
                            <td>{formData.CPR}</td>
                            <td>&lt;0.3</td> 
                            <td>mg/dl</td>
                        </tr> }
                        {renel && <tr className="head-div">
                            <th colspan="4">Renal Function Test</th>
                        </tr>}
                        {formData.Blood_Area && (
                            <tr>
                                <td>Blood Urea</td>
                                <td>{formData.Blood_Area}</td>
                                <td>15 - 40</td>
                                <td>mg/dl</td>
                            </tr>
                        )}
                        {formData.Serum_Creatinine && (
                            <tr>
                                <td>Serum Creatinine</td>
                                <td>{formData.Serum_Creatinine}</td>
                                <td>{(() => {
                                        if (formData.gender === "Male") {
                                            return "0.7 - 1.2";
                                        } else {
                                            return "0.6 - 1.2";
                                        }
                                    })()}
                                </td>
                                <td>mg/dl</td>
                            </tr>
                        )}
                        {formData.Serum_Uricacid && (
                            <tr>
                                <td>Serum Uricacid</td>
                                <td>{formData.Serum_Uricacid}</td>
                                <td>{(() => {
                                        if (formData.gender === "Male") {
                                            return "4 - 7";
                                        } else {
                                            return "3 - 6";
                                        }
                                    })()}
                                </td>
                                <td>mg/dl</td>
                            </tr>
                        )}
                        {Electrolyte && <tr className="head-div">
                            <th colspan="4">Electrolytes</th>
                        </tr>}
                        {formData.Sodium && <tr>
                            <td>Sodium</td>
                            <td>{formData.Sodium}</td>
                            <td>135 - 145</td> 
                            <td>mmol</td>
                        </tr> }
                        {formData.Pottasium && <tr>
                            <td>Potassium</td>
                            <td>{formData.Pottasium}</td>
                            <td>3.5 - 5.0</td> 
                            <td>mmol</td>
                        </tr> }
                        {formData.Bicarbonate && <tr>
                            <td>Bicarbonate</td>
                            <td>{formData.Bicarbonate}</td>
                            <td>23 - 27</td> 
                            <td>mmol</td>
                        </tr>}
                        {formData.Chloride && <tr>
                            <td>Chloride</td>
                            <td>{formData.Chloride}</td>
                            <td>96 - 106</td> 
                            <td>mmol</td>
                        </tr> }
                        {formData.Calcium && <tr>
                            <td>Calcium</td>
                            <td>{formData.Calcium}</td>
                            <td>8.5 - 10.2</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {formData.Phosphorus && <tr>
                            <td>Phosphorus</td>
                            <td>{formData.Phosphorus}</td>
                            <td>2.8 - 4.5</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {lvr_function && <tr className="head-div">
                            <th colspan="4">Liver Function Test</th>
                        </tr>}
                        {formData.Total_Bilirubin && <tr>
                            <td>Total Bilirubin</td>
                            <td>{formData.Total_Bilirubin}</td>
                            <td>0 - 1</td> 
                            <td>mg/dl</td>
                        </tr> }
                        {formData.Direct_Bilirubin && <tr>
                            <td>Direct Bilirubin</td>
                            <td>{formData.Direct_Bilirubin}</td>
                            <td>0 - 0.35</td> 
                            <td>mg/dl</td>
                        </tr>} 
                        {formData.Indirect_Bilirubin && <tr>
                            <td>Indirect Bilirubin</td>
                            <td>{formData.Indirect_Bilirubin}</td>
                            <td>0.2 - 0.65</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {formData.SGOT && <tr>
                            <td>SGOT</td>
                            <td>{formData.SGOT}</td>
                            <td>10 - 40</td> 
                            <td>Iu/l</td>
                        </tr> }
                        {formData.SGPT && <tr>
                            <td>SGPT</td>
                            <td>{formData.SGPT}</td>
                            <td>10 - 40</td> 
                            <td>Iu/l</td>
                        </tr>}
                        {formData.Alkaline_Phosphate && <tr>
                            <td>Alkaline Phosphate</td>
                            <td>{formData.Alkaline_Phosphate}</td>
                            <td>40 - 112</td> 
                            <td>U/L</td>
                        </tr> }
                        {formData.Total_Protein && <tr>
                            <td>Total Protein</td>
                            <td>{formData.Total_Protein}</td>
                            <td>6 - 8.5</td> 
                            <td>gm/dl</td>
                        </tr>} 
                        {formData.Albumin && <tr>
                            <td>Albumin</td>
                            <td>{formData.Albumin}</td>
                            <td>3.5 - 5</td> 
                            <td>gm/dl</td>
                        </tr>}
                        {formData.Globumin && <tr>
                            <td>Globumin</td>
                            <td>{formData.Globumin}</td>
                            <td>2 - 3.5</td> 
                            <td>gm/dl</td>
                        </tr> }
                        {lvr_function && <tr>
                            <td>Albumin<strong>:</strong>Globumin Ratio</td>
                            <td colSpan={3}>1.2 - 1.5</td>
                            
                        </tr> }
                        {Lipid && <tr className="head-div">
                            <th colspan="4">Lipid Profile</th>
                        </tr>}
                        {formData.Total_Cholestrol && <tr>
                            <td>Total Cholestrol</td>
                            <td>{formData.Total_Cholestrol}</td>
                            <td>{(() => {
                                    if (formData.age <= 19) {
                                        return "125-200";
                                    }  else {
                                        return "<170";
                                    }
                                })()}</td> 
                            <td>mg/dl</td>
                        </tr> }
                        {formData.Triglycerides && <tr>
                            <td>Triglycerides</td>
                            <td>{formData.Triglycerides}</td>
                            <td>&lt;150</td> 
                            <td>mg/dl</td>
                        </tr> }
                        {formData.LDL_Cholestrol && <tr>
                            <td>LDL Cholestrol</td>
                            <td>{formData.LDL_Cholestrol}</td>
                            <td>{(() => {
                                    if (formData.age <= 19) {
                                        return "<110";
                                    }  else {
                                        return "<100";
                                    }
                                })()}</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {formData.HDL_Cholestrol && <tr>
                            <td>HDL Cholestrol</td>
                            <td>{formData.HDL_Cholestrol}</td>
                            <td>{(() => {
                                    if (formData.age <= 19) {
                                        return ">45";
                                    }  else {
                                        return ">50";
                                    }
                                })()}</td> 
                            <td>mg/dl</td>
                        </tr>} 
                        {formData.Non_HDL_Cholestrol && <tr>
                            <td>Non-HDL Cholestrol</td>
                            <td>{formData.Non_HDL_Cholestrol}</td>
                            <td>{(() => {
                                    if (formData.age <= 19) {
                                        return "<120";
                                    }  else {
                                        return "<130";
                                    }
                                })()}</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {formData.VLDL_Cholestrol && <tr>
                            <td>VLDL Cholestrol</td>
                            <td>{formData.VLDL_Cholestrol}</td>
                            <td>5 - 30</td> 
                            <td>mg/dl</td>
                        </tr>}
                        {Lipid && <tr>
                            <td>Cholestrol <strong>:</strong> HDL Ratio</td>
                            <td colSpan={3}>&lt;6</td>
                            
                        </tr> }
                    </tbody>
                </table>
            </div>
            <div className='last-last'>
                <div className="more-info">
                    <h4>Instruments: <span>Fully automated cell counter</span></h4>
                    <h4>Interpretation: <span>Further confirm for Anemia</span></h4>
                </div>
                <div className="end">
                    <h4>Thanks for Reference</h4>
                    <h4>****End of Report****</h4>
                </div>
                <div className="signature">
                    <div className="doc-sign">
                        <h4>Dr.Krishna</h4>
                        <h5>(M.D.D.M. DNB)</h5>
                    </div>
                </div>
                <div className="last">
                    <h4>Generated on:{formattedDateTime}</h4>
                </div>
            </div>
        </div>
        <div className="download-btn">
            <button onClick={() => handlePrint(formData.names)}>Download</button>
        </div>
    </div>
  )
}



export default Pdf
