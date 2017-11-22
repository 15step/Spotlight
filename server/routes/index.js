const userRoutes = require("./users");

const constructorMethod = (app) => {
    app.use("/", userRoutes);

}

module.exports = constructorMethod;