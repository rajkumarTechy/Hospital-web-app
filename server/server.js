import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import multer from 'multer'




const port = 3001
const app = express();

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"hospital"

})

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Message:"Provide Token"})
    }else{
        jwt.verify(token,"our-jsonwebtoken-secret-key", (err, decoded) => {
            if(err){
            return res.json({Message:"Authentication Error."})
        }else{
            req.name = decoded.name;
            next();
        }

        })
        
    }
}

app.get('/', verifyUser, (req,res)=>{

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
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1h' });
            res.cookie('token',token);
            return res.json({Status:"Success"})
        }else{
            return res.json({Message:"Invalid Username or Password"})
        }
    })
})

app.post('/reports', (req, res)=>{
    const sql = "INSERT INTO `patientreports`(`names`, `age`, `gender`, `contact`, `WBC`, `RBC`, `Hemoglobin`, `MCV`, `MCH`, `Haemotocrit`, `MCHC`, `RDW`, `Paltelet`, `MPV`, `Neutrophils`, `Lymphocytes`, `Monocytes`, `Sodium`, `Pottasium`, `Chloride`, `Bicarbonate`, `Calcium`, `Phosphorus`, `Total_Bilirubin`, `Direct_Bilirubin`, `Indirect_Bilirubin`, `SGOT`, `SGPT`, `Alkaline_Phosphate`, `Total_Protein`, `Albumin`, `Globumin`, `Total_Cholestrol`, `Triglycerides`, `LDL_Cholestrol`, `HDL_Cholestrol`, `Non_HDL_Cholestrol`, `VLDL_Cholestrol`, `Albumin_urine`, `Sugar`, `Pus_Cell`, `Epithelial_Cell`, `RBC_Crystal`, `Fasting_Blood_Sugar`, `Post_Prandial_Blood`, `Random_Blood_Sugar`, `Blood_Area`, `Serum_Creatinine`, `Serum_Uricacid`) VALUES (?)"

    const values = [
        req.body.names, req.body.age, req.body.gender, req.body.contact,
        req.body.WBC, req.body.RBC, req.body.Hemoglobin, req.body.MCV, req.body.MCH, req.body.Haemotocrit, req.body.MCHC, req.body.RDW, req.body.Paltelet, req.body.MPV, req.body.Neutrophils, req.body.Lymphocytes, req.body.Monocytes, req.body.Sodium, req.body.Pottasium, req.body.Chloride, req.body.Bicarbonate, req.body.Calcium, req.body.Phosphorus, req.body.Total_Bilirubin, req.body.Direct_Bilirubin, req.body.Indirect_Bilirubin, req.body.SGOT, req.body.SGPT, req.body.Alkaline_Phosphate, req.body.Total_Protein, req.body.Albumin, req.body.Globumin, req.body.Total_Cholestrol, req.body.Triglycerides, req.body.LDL_Cholestrol, req.body.HDL_Cholestrol, req.body.Non_HDL_Cholestrol, req.body.VLDL_Cholestrol, req.body.Albumin_urine, req.body.Sugar, req.body.Pus_Cell, req.body.Epithelial_Cell, req.body.RBC_Crystal, req.body.Fasting_Blood_Sugar, req.body.Post_Prandial_Blood, req.body.Random_Blood_Sugar, req.body.Blood_Area, req.body.Serum_Creatinine, req.body.Serum_Uricacid

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


app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM patientreports WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Server side error" });
        return res.json(result);
    });
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, "./public/uploads") 
    },
    filename: function (req, file, cb) {
      
      return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  

  const upload = multer({ storage });
  

  app.post('/upload', upload.single('pdfFile'), (req, res) => {
    
    res.send('File uploaded successfully!');
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })