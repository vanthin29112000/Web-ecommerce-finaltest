const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Users = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { checkCompare, hashing } = require("../utils/hasing");

//======== CUSTOMER / STAFF========
const registerUser = expressAsyncHandler(async (req, res) => {
   const {
      name,
      email,
      password,
      gender,
      birthday,
      phoneNumber,
      address,
      position,
   } = req.body;

   const userExist = await Users.findOne({ email });
   if (userExist) {
      res.status("400");
      throw new Error("user already exists");
   } else {
      try {
         const newUser = await Users.create({
            name,
            email,
            password: hashing(password),
            gender,
            birthday,
            phoneNumber,
            address,
            position,
         });
         if (newUser) {
            const {
               name,
               email,
               password,
               gender,
               birthday,
               phoneNumber,
               address,
            } = newUser;
            res.status("200").json({
               _id: newUser._id,
               name,
               email,
               gender,
               birthday,
               phoneNumber,
               address,
               token: generateToken(newUser._id),
            });
         } else {
            res.status("400");
            throw new Error("invalid user data");
         }
      } catch (error) {
         res.status("400");
         throw new Error("Invalid data user !!!");
      }
   }
});

const loginUser = expressAsyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const userExist = await Users.findOne({ email });
   if (!userExist) {
      res.status("400");
      throw new Error("email is not registered!!");
   }

   if (userExist.isBlocking.type) {
      res.status("400");
      throw new Error("This account has been blocked !!");
   }

   const resultCheck = checkCompare(password, userExist.password);

   if (resultCheck) {
      res.status("200").json({
         token: generateToken(userExist._id),
      });
   } else {
      res.status("400");
      throw new Error("Email or password is not valid");
   }
});

const getProfilesUser = expressAsyncHandler((req, res) => {
   const { name, email, gender, birthday, phoneNumber, address } = req.user;

   if (req.user) {
      return res
         .status("200")
         .json({ name, email, gender, birthday, phoneNumber, address });
   } else {
      res.status("400");
      throw new Error("user is not valid");
   }
});

const updateProfileUser = expressAsyncHandler(async (req, res) => {
   const { name, password, gender, birthday, phoneNumber, address } = req.body;

   const user = await Users.findById(req.user._id);

   user.name = name || user.name;
   if (password) {
      user.password = hashing(password);
   }
   user.gender = gender || user.gender;
   user.birthday = birthday || user.birthday;
   user.phoneNumber = phoneNumber || user.phoneNumber;
   user.address = address || user.address;
   try {
      const newUpdate = await user.save();
      res.status("200").json({
         name: newUpdate.name,
         password: newUpdate.password,
         gender: newUpdate.gender,
         birthday: newUpdate.birthday,
         phoneNumber: newUpdate.phoneNumber,
         address: newUpdate.address,
         password: newUpdate.password,
      });
   } catch (error) {
      res.status("400");
      throw new Error("Update fail");
   }
});

const updateProductIncart = async (req, res) => {
   const user = req.user;
   const { qty } = req.body;

   const index = user.shoppingCart.findIndex(
      (ele) => ele.product.toString() === req.params.id.toString()
   );
   if (index !== -1) {
      user.shoppingCart[index].qty = qty;
   } else {
      user.shoppingCart.push({ product: req.params.id, qty: qty });
   }

   try {
      const newUser = await user.save();
      res.status("200").json(newUser);
   } catch (error) {
      console.log(error);
      res.status("400");
      throw new Error("Update shopping cart fail");
   }
};

const removeProductIncart = async (req, res) => {
   const user = req.user;

   const temp = user.shoppingCart.filter(
      (ele) => ele.product.toString() !== req.params.id.toString()
   );

   user.shoppingCart = temp;

   try {
      const newUser = await user.save();
      res.status("200").json(newUser);
   } catch (error) {
      console.log(error);
      res.status("400");
      throw new Error("Remove product incart fail");
   }
};

//======== ADMIN ========

const getAllUser = expressAsyncHandler(async (req, res) => {
   try {
      const listUser = await Users.find().select("-password");
      res.status("200").json(listUser);
   } catch (error) {
      res.status("400");
      throw new Error("Get fail");
   }
});

const blockUser = expressAsyncHandler(async (req, res) => {
   const { id } = req.params;

   const user = req.userExist;

   if (!user.isBlocking.type) {
      try {
         await Users.findByIdAndUpdate(id, {
            $set: {
               isBlocking: {
                  type: true,
                  user: req.user._id,
                  blockDay: new Date(),
               },
            },
         });
         res.status("200").json({ message: "Block success" });
      } catch (error) {
         res.status("400");
         throw new Error("Delete fail");
      }
   } else {
      res.status("400");
      throw new Error("The account has been blocked before");
   }
});

const unblockUser = expressAsyncHandler(async (req, res) => {
   const { id } = req.params;

   const user = await Users.findById(id);
   if (!user) {
      res.status("400");
      throw new Error("Account not found");
   }

   if (user.isBlocking.type) {
      try {
         await Users.findByIdAndUpdate(id, {
            $set: {
               isBlocking: {
                  type: false,
                  user: req.user._id,
                  blockDay: new Date(),
               },
            },
         });
         res.status("200").json({ message: "unblock success" });
      } catch (error) {
         res.status("400");
         throw new Error("unblock fail");
      }
   } else {
      res.status("400");
      throw new Error("The account is not blocked");
   }
});

const getUserByID = expressAsyncHandler(async (req, res) => {
   try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) {
         res.status("400");
         throw new Error("User is not found");
      }

      res.status("200").json(user);
   } catch (error) {
      res.status("400");
      throw new Error("This account could not be found");
   }
});

const updateUserByID = expressAsyncHandler(async (req, res) => {
   const userExist = await Users.findById(req.params.id);

   if (!userExist) {
      res.status("400");
      throw new Error("This account could not be found");
   }

   const { name, gender, birthday, phoneNumber, address, position } = req.body;

   userExist.name = name || userExist.name;
   userExist.gender = gender || userExist.gender;
   userExist.birthday = birthday || userExist.birthday;
   userExist.phoneNumber = phoneNumber || userExist.phoneNumber;
   userExist.address = address || userExist.address;
   userExist.position = position || userExist.position;

   if (req.body.password) {
      userExist.password = req.body.password;
   }

   try {
      const updateUser = await userExist.save();
      const { name, email, gender, birthday, phoneNumber, address } =
         updateUser;
      res.status("200").json({
         name,
         email,
         gender,
         birthday,
         phoneNumber,
         address,
      });
   } catch (error) {
      res.status("400");
      throw new Error("Update user fail");
   }
});

module.exports = {
   registerUser,
   loginUser,
   getProfilesUser,
   updateProfileUser,
   getAllUser,
   blockUser,
   getUserByID,
   unblockUser,
   updateUserByID,
   updateProductIncart,
   removeProductIncart,
};
