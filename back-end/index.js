const app = require("./app");

const PORT = process.env.PORT;

// if (port == null || port == "") {
//     port = 3001;
// }

app.listen(PORT, () => {
    console.log(
        `Server has started successfully in ${process.env.NODE_ENV} mode at port ${PORT}`
    );
});
