const express = require("express");
const userRouter = require("./routes/userroutes");
const productRouter = require("./routes/productroutes");
const adminProductsRouter = require("./routes/adminProductsRoutes");
const discountRouter = require("./routes/discountRoutes");
const  User= require('./models/usermodel')
const multer = require("multer");
const cookieParser = require('cookie-parser');


const path = require("path");

const app = express();
app.use(express.json());
app.set("view engine", "pug");
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
// // Serving static files
app.use(express.static(path.join(__dirname, "public")));
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log(file)
    // const ext = file.mimetype.split('/')[1];
    cb(null,originalname.replace(/\.[^/.]+$/,"")+ '_'+ Date.now() + path.extname(file.originalname));
  }
});
let maxSize = 2 * 1000 *1000
let upload = multer({
  storage: multerStorage,
  limits:{
    fileSize:maxSize
  },
  fileFilter:function(req,file,cb){
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype)
    let extname = filetypes.test( path.extname(file.originalname).toLowerCase())
    if(mimetype && extname){
        return cb(null,true)
    }
    cb("error:File upload only supports the following :"+filetypes)
  }
}).single('myfiles');
// exports.uploadProductPhoto = upload.single('photo');
// app.get("/", (req, res) => {
//   res.status(200).render("base", {
//     title:"index"
//   });
// })
// app.get('/ff',(req,res)=>{
//   res.render('add-product')
// })
// app.post('/upload',(req,res,next)=>{
//   upload(req,res,function(err){
//     if(err){
//       res.send(err);
//     }else{
//       res.send("success image uploaded")
//     }
//   })
// })
const jwt = require('jsonwebtoken');


app.get("/product-details/:prodId", (req, res) => {
  res.status(200).render("product-details", {
    title:"product"
  });
});
app.get("/login", (req, res) => {
  res.status(200).render("login", {
    title:"login",
    req:req
  });
});


app.get("/register", (req, res) => {
  res.status(200).render("register", {
    title:"register"
  });
});


// app.get("/overview", (req, res) => {
//   res.status(200).render("overview", {
//     title:"overview",
    
//   });
// });
app.get("/overview", (req, res) => {
   const authToken = document.cookie.split(';').find(cookie => cookie.includes('jwt='));
  if (authToken) {
  console.log('authToken',authToken)

    // If JWT token exists, render the page with logout button
    res.status(200).render("overview", {
      title: "Overview",
      isLoggedIn: true,
      authToken,
    });
  } else {
    // If JWT token doesn't exist, render the page with login button
    res.status(200).render("overview", {
      title: "Overview",
      isLoggedIn: false,
      req: req,
    });
  }
});
app.get("/profile", (req, res) => {
  res.status(200).render("profile", {
    title:"Profile"

  });
})
app.get("/admin/add-product",(req, res) => {
  res.status(200).render("add-product", {
    title:"add-product"
  });
});
app.get("/admin-collection", (req, res) => {
  res.status(200).render("admin-collection", {
    title:"admin-collection"
  });
});

app.get("/edit-product/:prodId", (req, res) => {
  res.status(200).render("edit-product", {
    title:"edit-product"
  });
}); 

// app.get("/product/add-to-cart", (req, res) => {
//   res.status(200).render("cart", {
//     title:"cart"
//   });
// });

// app.get("/admin/getorders", (req, res) => {
//   res.status(200).render("adminorders", {
//     title:"adminorders"
//   });
// });

app.get("/admin/admin-order-details", (req, res) => {
  res.status(200).render("admin-order-detail", {
    title:"admin-order-detail"
  });
});



app.get("/admin/creatediscount",(req, res) => {
  res.status(200).render("admin-create-discount", {
    title:"admin-create-discount"
  });
});

app.post("/discount",(req, res) => {
  res.status(200).render("admindiscount", {
    title:"admin-create-discount"
  });
});
app.get("/edit-discount", (req, res) => {
  res.status(200).render("admin-edit-discount", {
    title:"admin-edit-discount"
  });
});
app.use((req,res,next)=>{
  User.findById("644cfeecd50d65a1c407aa31")
  .then(userInDB=>{
    req.user = userInDB
    next()
  })
  .catch(err=> console.log(err))
})

app.use("/", userRouter);
app.use("/product", productRouter);
app.use("/admin", adminProductsRouter);
app.use("/", discountRouter);



module.exports = app;
