const mongoose = require("mongoose");

const db =
    "mongodb+srv://Steve:Steve1234@cluster0.nho9r.mongodb.net/Wishing-Tree-Limited";

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Could not connect to database", error);
    });

mongoose.set("useCreateIndex", true);
