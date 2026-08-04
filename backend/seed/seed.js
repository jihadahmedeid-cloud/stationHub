require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const admin = require("../models/admin");
const message = require("../models/message");
const station = require("../models/station");

const Admins = [
    {name:"jihad ahmed", email:"jihad.ahmedeid@gmail.com",password:"aszx2010."},
    {name:"abdelrahman", email:"eaad2004@hotmail.com",password:"123456"},
]