'use strict';

const bankAccountRouter = require("./bankAccount");


module.exports = (app) => {
  app.use("/bank-account", bankAccountRouter);
};
