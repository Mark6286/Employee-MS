import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    //console.log(req.body)
    const result = req.body;
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql,[result.email, result.password], (err, result) => {
        if(err) return res.json({loginStatus: false, Error: "Query error"});
        if(result.length > 0){
            const email = result[0].email;
            const token = jwt.sign({role: 'admin', email: email}, "jwt_secret_key", {expiresIn: '1d'});
            res.cookie('token', token)
            return res.json({loginStatus: true});
        }else{
            return res.json({loginStatus: false, Error: "Invalid email or password"});
        }
    })
})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const result = req.body;
    const sql = "INSERT INTO category(name) VALUES(?)";
    con.query(sql, [result.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true})
    })
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})
//end upload


router.post('/add_employee', upload.single('image'), (req, res) => {
    const result = req.body;
    const imagePath = req.file ? req.file.filename : null; 
    const sql = `INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES(?)`;
    bcrypt.hash(result.password, 10, (err, hash) => {   
        if(err){
            console.error("Hashing Error:", err);
            return res.json({ Status: false, Error: "Error during password hashing" });
        }

        const values = [
            result.name,
            result.email,
            hash,
            result.address,
            result.salary,
            imagePath,
            result.category
        ];

        con.query(sql, [values], (err, dbResult) => {
            if (err) {
                console.error("Database Query Error:", err);
                return res.json({ Status: false, Error: "Error inserting employee" });
            }
            return res.json({ Status: true, EmployeeID: dbResult.insertId });
        });
    })
})

export {router as adminRouter}