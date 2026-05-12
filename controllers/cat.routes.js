const Cat = require("../models/Cat");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const existingCat = await Cat.findOne({ owner: req.user._id });

    if (existingCat) {
      return res.status(400).json({ err: "You already created a cat" });
    }

    const cat = await Cat.create({
      name: req.body.name,
      color: req.body.color,
      owner: req.user._id,
    });

    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cat = await Cat.findOne({ owner: req.user._id });

    if (!cat) {
      return res.status(404).json({ err: "Cat not found" });
    }

    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedCat = await Cat.findOneAndUpdate(
      { owner: req.user._id },
      {
        name: req.body.name,
        color: req.body.color,
      },
      { new: true, runValidators: true },
    );

    if (!updatedCat) {
      return res.status(404).json({ err: "Cat not found" });
    }

    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
