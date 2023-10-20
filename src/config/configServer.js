import mongoose from "mongoose";
const URI="mongodb+srv://KatiaV:123@cluster0.y9v3q8o.mongodb.net/Ecommerce"


const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log("Base de datos conectada....")
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB