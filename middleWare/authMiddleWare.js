const expressAsyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const Users = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
   const authorization = req.headers.authorization;

   if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];
      let user = "";
      try {
         const resultVerify = JWT.verify(token, process.env.SECRET_KEY);
         user = await Users.findById(resultVerify.id).select("-password ");

         if (!user) {
            res.status("400");
            throw new Error("Account not found");
         }
      } catch (error) {
         res.status("401");
         throw new Error("Not authorized or");
      }

      if (!user.isBlocking.type) {
         req.user = user;
         next();
      } else {
         res.status("400");
         throw new Error("Account is blocked");
      }
   } else {
      res.status("401");
      throw new Error("Not authorized");
   }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
   let user = "";
   try {
      user = await Users.findById(req.user._id);
   } catch (error) {
      res.status("400");
      throw new Error("Connect fail");
   }
   if (req.user && user.position === 2) {
      next();
   } else {
      res.status("401");
      throw new Error("Member is not admin");
   }
});

const isCustomer = expressAsyncHandler(async (req, res, next) => {
   let user = "";

   try {
      user = await Users.findById(req.user._id);
   } catch (error) {
      res.status("400");
      throw new Error("Connect fail");
   }
   if (req.user && user.position === 0) {
      next();
   } else {
      res.status("401");
      throw new Error("Member is not customer");
   }
});

const isStaffOrAdmin = expressAsyncHandler(async (req, res, next) => {
   let user = "";
   try {
      user = await Users.findById(req.user._id);
   } catch (error) {
      res.status("400");
      throw new Error("Connect fail");
   }
   if (req.user && (user.position === 1 || user.position === 2)) {
      next();
   } else {
      res.status("401");
      throw new Error("Member is not staff or admin");
   }
});

const notAccountCurrent = expressAsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   if (id.localeCompare(req.user._id) === 0) {
      res.status("400");
      throw new Error("This action cannot be manipulated on your own account");
   } else {
      next();
   }
});

module.exports = {
   protect,
   isAdmin,
   notAccountCurrent,
   isCustomer,
   isStaffOrAdmin,
};
