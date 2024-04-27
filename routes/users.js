const express = require('express');
const router = express.Router();
const db = require("../db/db");

//router.use(morgan('tiny')) //middleware (ara katman) with morgan packet

router.get("/", async function(req,res){
    try{
        const [products, ] = await db.execute("select * from products");
        res.render("index", {
            products: products
        });
    }catch(err) {
        console.log(err);
    }
/*
    db.execute("select * from products")
    .then(result => {
        console.log(result[0]);

        res.render("index", {
            products: result[0]
        });
    })
    .catch(err => console.log(err));
*/
});


router.get("/try", function(req, res) {
    res.render('try');
});

router.get('/search-result', async function (req, res) {
    try {
        let genderFilter = req.query.gender; // Filtre parametresini al
        let sortBy = req.query.sort; // Sıralama parametresini al
        let query = "SELECT * FROM products"; // Temel sorgu
        let allProduct = req.query
        let params = [];

        if (genderFilter) {
            query += " WHERE gender = ?"; // Cinsiyet filtresini ekle
            params.push(genderFilter); // Parametreleri ekle
        }

        if (sortBy) {
            query += " ORDER BY " + sortBy; // Sıralama kriterini ekle
        }

        const [products, ] = await db.execute(query, params); // Parametreli sorguyu kullan
        res.render("search-result", {
            products: products
        });
    } catch(err) {
        console.log(err);
    }
});


router.get("/product", async function(req,res){
    try{

        const [products, ] = await db.execute("select * from products");
        res.render("product", {
            products: products
        });
    }catch(err) {
        console.log(err);
    }
});

// app.get('/about-us' , (req, res) => {
//     res.redirect('/about')
// })

//error page must be after the get methods
router.use((req, res) => {
    res.status(404).render('404',{title: 'Sayfa Bulunamadı'})
});

module.exports = router;