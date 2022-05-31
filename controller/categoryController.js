const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const createNewCategory = expressAsyncHandler(async (req, res) => {
   const user = req.user;
   const { name, type, listItem } = req.body;

   try {
      await Category.create({
         name,
         type,
         listItem,
         user: user._id,
         dayCreated: new Date(),
      });

      res.status("200").json({ message: "create success" });
   } catch (error) {
      res.status("400");
      throw new Error("create fail!!");
   }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
   const { name, type, listItem } = req.body;
   const category = req.category;

   category.name = name || category.name;
   category.type = type || category.type;
   category.listItem = listItem || category.listItem;

   try {
      await category.save();
      res.status("200").json({ message: "update success" });
   } catch (error) {
      res.status("400");
      throw new Error("update category fail !!");
   }
});

const getALlCategory = expressAsyncHandler(async (req, res) => {
   try {
      const listCategory = await Category.find();
      res.status("200").json(listCategory);
   } catch (error) {
      res.status("400");
      throw new Error("get all category fail");
   }
});

const getCategoryByID = expressAsyncHandler(async (req, res) => {
   try {
      res.status("200").json(req.category);
   } catch (error) {
      res.status("400");
      throw new Error("get all category fail");
   }
});

module.exports = {
   createNewCategory,
   updateCategory,
   getALlCategory,
   getCategoryByID,
};
