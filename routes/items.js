const express = require("express");
const router = express.Router();
const app = express();
const items = require("../fakeDb");
const ExpressError = require("../expressError");

router.get("/", (req, res, next) => {
  try {
    res.status(200).send(items);
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
    res.status(201).send({ added: { name, price } });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const result = items.filter(item => item.name == req.params.name);
    if (!result)
      throw new ExpressError("No item with that name. Try again", 400);
    res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const result = items.find(({ name, price }) => (name = req.params.name));
    if (!result)
      throw new ExpressError("No item with that name. Try again", 400);
    items.splice(items.indexOf(result), 1);
    res.status(200).send({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const found = items.filter(item => item.name == req.params.name);
    if (!found)
      throw new ExpressError("No item with that name. Try again", 400);
    items.forEach((item) => {
      if (item.name === req.params.name) {
        item.name = req.body.name ? req.body.name : item.name;
        item.price = req.body.price ? req.body.price : item.price;
      }
    });
    res.status(200).send({ message: "updated" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
