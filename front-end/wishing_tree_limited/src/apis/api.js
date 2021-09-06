import axios from "axios";

export default axios.create({
    baseURL: "https://online-shop-alpha-test.herokuapp.com/api",
});

// export default axios.create({
//     baseURL: "http://localhost:3001/api",
// });
