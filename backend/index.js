const app = require("./app");
const express = require("express");
const path = require("path");

if (process.env.NODE_ENV === "production") {
    app.use(
        express.static(
            path.join(__dirname, "../front-end/wishing_tree_limited/build")
        )
    );
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                "..",
                "front-end",
                "wishing_tree_limited",
                "build",
                "index.html"
            )
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("API started...");
    });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(
        `Server has started successfully in ${process.env.NODE_ENV} mode at port ${PORT}`
    );
});
