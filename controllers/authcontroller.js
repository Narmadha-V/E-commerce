const User = require("./../models/usermodel");
const CartItem = require("./../models/cartItemModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res) => {
  const { email, password: plainTextPassword ,role} = req.body;
  const token = signToken({ id: req.body._id });
  if (!email) {
    return res.json({
      status: "error",
      message: " Invalid mailId",
    });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({
      status: "error",
      message: " Invalid password ",
    });
  }
  if (plainTextPassword.length < 4) {
    return res.json({
      status: "error",
      message: " Password too small.Should be atleast 8 characters ",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      email,
      password,
      role
    });
    // console.log("user created successfully:", response);

    res.json({
      status: "ok",
      token,
      data: {
        user: response,
        // Add user ID to response
      },
    });
  } catch (error) {
    console.log(error);
    // duplicate key error collection
    if (error.code === 11000) {
      return res.json({
        status: "error",
        message: "user with this email already in use.",
      });
    }
    throw error;
  }
};
let userId = null;
exports.login = async (req, res) => {
    const authToken = req.cookies.jwt;
  if (authToken) {
    // JWT token exists, redirect to home page
    return res.redirect('/product/home');
  }
  // 1) Check if email and password exist
  const { email, password } = req.body;

  const newUser = await User.findOne({ email });
  if (!newUser) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid mail/password" });
  }
  // console.log(newUser)
  let id = newUser._id;
  let role = newUser.role;

  if (await bcrypt.compare(password, newUser.password)) {
   let token = signToken(newUser._id);
    req.token = token;
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        // Date.now() +  oneDay
      ),
      httpOnly: true,
      email:email,
    });
    // if (newUser.role === 'admin') {
    //   return res.redirect('/admin/admin-collection');
    // }
    return res.status(200) .json({ 
        status: "success",
         email: email,
         token,
         id,
         role,
          data:
          { 
            token,
            userId: newUser._id,
          }
     });
  };
  res.json({ status: "error", message: "Invalid mail/password" });
};
exports.decodeJWT=(req, res, next)=> {
  const token = req.cookies.jwt;
  // console.log('hbj',token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      // console.log('user',req.user)
    } catch (err) {
      // handle error
    }
  }
  next();
};
exports.protect = async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  const authToken = req.cookies.jwt;
  if (authToken) {
    token = authToken;
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.render('login', { message: 'Please login into get access ' });
    }
    token = authHeader.split(' ')[1];
  }

  // 2) Verification token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded)
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next('The user belonging to this token does no longer exist.', 401 );
    }

    req.user = currentUser;
    if(req.originalUrl === 'login'){
      return next();
    }
    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
};
exports.logout = async (req, res, next) => {
  userId = null;
  await CartItem.deleteMany({ user: req.userId});
  res.clearCookie('jwt');
  res.status(200).render("login", {
    title:"login",
  });
};
// exports.logout = async (req, res, next) => {
//   try {
//     // Get the user's cart items
//     const cartItems = await CartItem.find({ user: req.userId });
    
//     // Set the user ID to null
//     req.userId= null;
    
//     // Update the cart items to associate them with the null user ID
//     await CartItem.updateMany(
//       { user: req.userId },
//       { $set: { user: null } }
//     );

//     // Clear the JWT cookie
//     res.clearCookie('jwt');

//     // Render the login page
//     res.status(200).render("login", {
//       title:"login",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']. role='user'
    if (!roles.includes(req.user.role)) {
      return next('You do not have permission to perform this action', 403);
    }

    next();
  };
};

