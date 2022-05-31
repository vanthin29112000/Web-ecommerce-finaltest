const Address = require("../models/adressModel");

const address = {
   city: "Thành phố Hà Nội",
   cityID: "1",
   district: "Quận Ba Đình",
   districtID: "1",
   ward: "Phường Phúc Xá",
   wardID: "1",
   addressDetail: "78/49/7 Ngõ 4",
};

const users = [
   {
      name: "Phan Van Thin",
      email: "vanthin1203@gmail.com",
      password: "123456",
      gender: 1,
      birthday: new Date(),
      phoneNumber: "09090090909",
      address: address,
      position: 2,
   },
];

module.exports = users;
