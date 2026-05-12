const router = require("express").Router();
const Subject = require("../models/Subject");

router.post("/", async (req, res) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      color: req.body.color,
      notes: req.body.notes,
      owner: req.user._id,
    });

    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      {
        name: req.body.name,
        color: req.body.color,
        notes: req.body.notes,
        totalStudyTime: req.body.totalStudyTime,
      },
      { new: true, runValidators: true },
    );

    if (!updatedSubject) {
      return res.status(404).json({ err: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSubject = await Subject.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deletedSubject) {
      return res.status(404).json({ err: "Subject not found" });
    }

    res.status(200).json({ msg: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
