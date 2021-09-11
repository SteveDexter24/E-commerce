const mongoose = require("mongoose");

const db = process.env.MONGODB_SECRET;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Could not connect to database", error);
    });

mongoose.set("useCreateIndex", true);
