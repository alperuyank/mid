const express = require('express');
const router = express.Router();
const db = require("../db/db");

//router.use(morgan('tiny')) //middleware (ara katman) with morgan packet

router.get("/", async function(req,res){
    try {
        let genderFilter = req.query.gender; // Filtre parametresini al
        let query = "SELECT * FROM products"; // Temel sorgu
        let params = [];

        if (genderFilter) {
            query += " WHERE gender = ?"; // Cinsiyet filtresini ekle
            params.push(genderFilter); // Parametreleri ekle
        }

        const [products, ] = await db.execute(query, params); // Parametreli sorguyu kullan
        res.render("index", {
            products: products
        });
    } catch(err) {
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
        let searchTerm = req.query.searchTerm; // Arama terimini al
        let genderFilter = req.query.genderFilter; // Cinsiyet filtresini al

        let query = "SELECT * FROM products WHERE 1"; // Temel sorgu
        let params = [];

        if (searchTerm) {
            query += " AND name LIKE ?"; // Arama terimine göre filtreleme ekle
            params.push("%" + searchTerm + "%"); // Parametreleri ekle
        }

        if (genderFilter) {
            query += " AND gender = ?"; // Cinsiyet filtresini ekle
            params.push(genderFilter); // Parametreleri ekle
        }

        const [products, ] = await db.execute(query, params); // Parametreli sorguyu kullan
        res.render("search-result", { products: products });
    } catch(err) {
        console.log(err);
    }
});



router.get("/product", async function(req,res){
    try{
        let searchTerm = req.query.term; // Arama terimini al

        let query = "SELECT * FROM products"; // Temel sorgu
        let params = [];

        if (searchTerm) {
            query += " WHERE name LIKE ?"; // Arama terimine göre filtreleme ekle
            params.push("%" + searchTerm + "%"); // Parametreleri ekle
        }

        const [products, ] = await db.execute(query, params); // Parametreli sorguyu kullan

        res.render("product", {
            products: products
        });
    } catch(err) {
        console.log(err);
    }
});

router.get('/product-details/:id', async (req, res) => {
    try {
        const productId = req.params.id; // URL'den ürün ID'sini al
        
        // Mevcut ürünü getir
        const [productDetails, ] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
        const product = productDetails[0]; // İlk ürünü al (tek bir ürün olacak)
        
        // Bir sonraki fotoğrafın ID'sini belirle
        const [nextPhotoIdResult, ] = await db.execute('SELECT MIN(id) AS next_photo_id FROM products WHERE id > ?', [productId]);
        const nextPhotoId = nextPhotoIdResult[0].next_photo_id;

        // Bir sonraki fotoğrafı getir
        let nextPhoto = null;
        if (nextPhotoId % 2 == 0) {
            const [nextPhotoDetails, ] = await db.execute('SELECT * FROM products WHERE id = ?', [nextPhotoId]);
            nextPhoto = nextPhotoDetails[0];
        }

        res.render('product-details', { product: product, nextPhoto: nextPhoto });
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).send('Error fetching product details');
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