const express = require("express");
const router = express.Router();
const app = express();
const items = require("../fakeDb");
const ExpressError = require("../expressError");

router.get("/", (req, res, next) => {
  try {
    res.send(items);
  } catch (err) {
    return next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!(name && price))
      throw new ExpressError("Please provide a name and price", 400);
    items.push({ name, price });
    res.status(200).send({"added":{name,price}});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
