import myql from 'mysql'

const con = myql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect((err) => {
    if(err){
        console.log(`Connection error: ${err}`)
    }else{
        console.log('Connected')
    }
})

export default con;