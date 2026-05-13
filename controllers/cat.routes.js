const Cat = require("../models/Cat");
const User = require("../models/User");

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
    const { type, id, cost } = req.body;

    const cat = await Cat.findOne({ owner: req.user._id });
    const user = await User.findById(req.user._id);

    if (!cat) {
      return res.status(404).json({ err: "Cat not found" });
    }

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    if (!id) {
      if (type === "hat") cat.equippedHat = "";
      if (type === "glasses") cat.equippedGlasses = "";

      await cat.save();

      return res.status(200).json({ cat, user });
    }

    let ownedField;
    let equippedField;

    if (type === "hat") {
      ownedField = "ownedHats";
      equippedField = "equippedHat";
    }

    if (type === "glasses") {
      ownedField = "ownedGlasses";
      equippedField = "equippedGlasses";
    }

    if (type === "background") {
      ownedField = "ownedBackgrounds";
      equippedField = "equippedBackground";
    }

    const alreadyOwned = cat[ownedField].includes(id);

    if (!alreadyOwned) {
      if (user.coins < cost) {
        return res.status(400).json({ err: "Not enough coins" });
      }

      user.coins -= cost;
      cat[ownedField].push(id);
    }

    cat[equippedField] = id;

    await user.save();
    await cat.save();

    res.status(200).json({ cat, user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
