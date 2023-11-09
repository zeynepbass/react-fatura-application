const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const categoryRoute=require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

const logger = require("morgan"); //http isteklerimizde log tutar terminalde 404 500 dondurur
dotenv.config();
const connect= async  ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect your application")
    } catch (error) {
        throw error
    }
}
const app=express();
app.use(express.json()) //ilk json cevırırız
app.use(cors())
app.use(logger("dev"));
const PORT=process.env.PORT || 8903;
app.get("/", (req,res)=>res.send("hello world"))




app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

connect()
app.listen(PORT,()=>{
    console.log(`example app listening on port ${PORT}`)
})
