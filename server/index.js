import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import multer from 'multer'

require('dotenv').config();



const port = 3001
const app = express();

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["https://hospital-web-app-eight.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://hospital-web-app-eight.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

const db = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME
  });
  

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Message:"Provide Token"})
    }else{
        jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err){
            return res.json({Message:"Authentication Error."})
        }else{
            req.name = decoded.name;
            next();
        }

        })
        
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/protected', verifyUser, (req,res)=>{

    return res.json({Status:"Success", name:req.name})

})

app.get('/logout', (req, res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})

app.get('/records', (req,res)=>{
    const sql = "SELECT `id`, `names`, `age`, `contact`, DATE_FORMAT(`date_added`, '%Y-%m-%d') AS `date_added` FROM `patientreports`";

    db.query(sql, (err, results)=>{
        if(err) return res.json({Message:"Error inside server"})
        return res.json(results)
    })
})


app.get('/latest-pid', (req, res) => {
    const sql = 'SELECT MAX(`id`) as max_id FROM `patientreports`';
  
    db.query(sql, (err, results)=>{
        if(err) return res.json({Message:"Error inside server"})

        const maxId = results[0].max_id;
        return res.json({ maxId });
    })
  })

app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?"
    db.query(sql,[req.body.username,req.body.password], (err,data) => {
        if(err) return res.json({Message:"Server Side Error"});
        if(data.length > 0){
            const name = data[0].username
            const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'strict' 
            });
            
            return res.json({Status:"Success"})
        }else{
            return res.json({Message:"Invalid Username or Password"})
        }
    })
})

app.post('/reports', (req, res)=>{
    const sql = "INSERT INTO `patientreports`(`names`, `age`, `gender`, `contact`, `WBC`, `RBC`, `Hemoglobin`, `MCV`, `MCH`, `Haemotocrit`, `MCHC`, `RDW`, `Paltelet`, `MPV`, `Neutrophils`, `Lymphocytes`, `Monocytes`, `Sodium`, `Pottasium`, `Chloride`, `Bicarbonate`, `Calcium`, `Phosphorus`, `Total_Bilirubin`, `Direct_Bilirubin`, `Indirect_Bilirubin`, `SGOT`, `SGPT`, `Alkaline_Phosphate`, `Total_Protein`, `Albumin`, `Globumin`, `Total_Cholestrol`, `Triglycerides`, `LDL_Cholestrol`, `HDL_Cholestrol`, `Non_HDL_Cholestrol`, `VLDL_Cholestrol`, `Albumin_urine`, `Sugar`, `Pus_Cell`, `Epithelial_Cell`, `RBCC`, `Crystal`, `Fasting_Blood_Sugar`, `Post_Prandial_Blood`, `Random_Blood_Sugar`, `HABC`, `Blood_Area`, `Serum_Creatinine`, `Serum_Uricacid`,`coll_date`,`CRP`,`doc_name`) VALUES (?)"

    const values = [
        req.body.names, req.body.age, req.body.gender, req.body.contact,
        req.body.WBC, req.body.RBC, req.body.Hemoglobin, req.body.MCV, req.body.MCH, req.body.Haemotocrit, req.body.MCHC, req.body.RDW, req.body.Paltelet, req.body.MPV, req.body.Neutrophils, req.body.Lymphocytes, req.body.Monocytes, req.body.Sodium, req.body.Pottasium, req.body.Chloride, req.body.Bicarbonate, req.body.Calcium, req.body.Phosphorus, req.body.Total_Bilirubin, req.body.Direct_Bilirubin, req.body.Indirect_Bilirubin, req.body.SGOT, req.body.SGPT, req.body.Alkaline_Phosphate, req.body.Total_Protein, req.body.Albumin, req.body.Globumin, req.body.Total_Cholestrol, req.body.Triglycerides, req.body.LDL_Cholestrol, req.body.HDL_Cholestrol, req.body.Non_HDL_Cholestrol, req.body.VLDL_Cholestrol, req.body.Albumin_urine, req.body.Sugar, req.body.Pus_Cell, req.body.Epithelial_Cell, req.body.RBCC, req.body.Crystal, req.body.Fasting_Blood_Sugar, req.body.Post_Prandial_Blood, req.body.Random_Blood_Sugar, req.body.HABC, req.body.Blood_Area, req.body.Serum_Creatinine, req.body.Serum_Uricacid,req.body.coll_date,req.body.CRP,req.body.doc_name

    ]
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Error inside server", error: err.message });
        }
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully", result });
    });
})


// app.delete('/delete/:id', (req, res) => {
//     const sql = "DELETE FROM patientreports WHERE id = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Message: "Server side error" });
//         return res.json(result);
//     });
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })