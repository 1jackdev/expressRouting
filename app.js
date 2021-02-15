const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const ExpressError = require("./expressError");

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/items", require("./routes/items"));



// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
  // generic error handler
  app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
