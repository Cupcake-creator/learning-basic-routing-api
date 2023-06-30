const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// TO render html file
app.use(express.static("public"));

// To Access to request body
app.use(bodyParser.urlencoded({extended: true}));
// or
// app.use(express.urlencoded());

app.use(express.json());

app.set("view engine", "ejs");

//Middleware must be very top of file
app.use(logger);

//logger Middleware can be added at any of router like this
app.get("/", logger, (req, res) => {
    res.render("index");
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

function logger(req, res, next) {
    console.log('PATH: ', req.originalUrl);
    next();
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
