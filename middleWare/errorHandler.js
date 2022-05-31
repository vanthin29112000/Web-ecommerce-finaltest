const errorHandle = (error, req, res, next) => {
   res.status(res.statusCode);
   res.json({
      type: "ERROR",
      message: error.message,
      data: req.data,
   });
};

module.exports = {
   errorHandle,
};
