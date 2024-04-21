
const express = require('express') //importing the Express module
const morgan = require('morgan')
const app = express() //check express methods -> app.
app.set('view engine', 'ejs')

const port = 3000 //app listen port 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

app.use(express.static('public')) //static usage which is folder public 

/*ara katman GET
app.use((req, res, next) => {
    console.log(req.method)
    next();
})*/ 

app.use(morgan('tiny')) //middleware (ara katman) with morgan packet

app.get('/' , (req, res) => {
    res.render('index', {title: 'Anasayfa'})
})

app.get('/search-result' , (req, res) => {
    res.render('search-result', {title: 'Sonuçlar'})
})

// app.get('/about-us' , (req, res) => {
//     res.redirect('/about')
// })

//error page must be after the get methods
app.use((req, res) => {
    res.status(404).render('404',{title: 'Sayfa Bulunamadı'})
})