const express = require("express");
//create app
const app = express();

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");

//import the required packages
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //it makes possible for backend to entertain frontend
const { cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000", //request from frontend
        credentials: true,
    })
)

app.use(fileUpload({useTempFiles: true,tempFileDir: "/tmp", }))
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running...',
    });
});

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});