const expressAsyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");

const createNewBrand = expressAsyncHandler(async (req, res) => {
   const { name, desc, logo } = req.body;
   const user = req.user;

   try {
      await Brand.create({
         name,
         desc,
         logo,
         user: user._id,
         dayCreated: new Date(),
      });

      res.status("200").json({ message: "create success" });
   } catch (error) {
      res.status("400");
      throw new Error("create fail !!");
   }
});

const updateBrandByID = expressAsyncHandler(async (req, res) => {
   const { name, desc, logo } = req.body;
   const brand = req.brand;

   brand.name = name || brand.name;
   brand.desc = desc || brand.desc;
   brand.logo = logo || brand.logo;

   try {
      await brand.save();
      res.status("200").json({ message: "update success" });
   } catch {
      res.status("400");
      throw new Error("update fail");
   }
});

const getALlBrand = expressAsyncHandler(async (req, res) => {
   try {
      const listBrand = await Brand.find();
      res.status("200").json(listBrand);
   } catch (error) {
      res.status("400");
      throw new Error("get all brand fail");
   }
});

const getBrandByID = expressAsyncHandler(async (req, res) => {
   try {
      res.status("200").json(req.brand);
   } catch (error) {
      res.status("400");
      throw new Error("get brand fail");
   }
});

module.exports = { createNewBrand, updateBrandByID, getALlBrand, getBrandByID };
