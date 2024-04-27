
const express = require('express'); //importing the Express module
const morgan = require('morgan');
const app = express(); //check express methods -> app.
const userRoutes = require("./routes/users");
const ejs = require('ejs');
app.set('view engine', 'ejs');


const port = 3000 //app listen port 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

app.use(express.static('public')) //static usage which is folder public 

app.use(userRoutes);

/*ara katman GET
app.use((req, res, next) => {
    console.log(req.method)
    next();
})*/ 
/*
const data = [
    {id: 1, name: "iphone 14", price: 30000 },
    {id: 2, name: "iphone 15", price: 40000 },
    {id: 3, name: "iphone 16", price: 50000 }
];*/

