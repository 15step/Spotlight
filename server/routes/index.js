const userRoutes = require("./users");
const searchRoutes = require("./search");

const constructorMethod = (app) => {
    app.use("/", userRoutes);
    app.use("/search", searchRoutes);

}

module.exports = constructorMethod;