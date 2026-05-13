const router = require("express").Router();
const User = require("../models/User");
const Subject = require("../models/Subject");

router.post("/complete", async (req, res) => {
  try {
    const { studiedMinutes, breakMinutes, subjectId } = req.body;

    const rewardAllowed = breakMinutes <= 7;

    let xpEarned = 0;
    let coinsEarned = 0;
    let happinessEarned = 0;

    if (rewardAllowed) {
      const rewardChunks = Math.floor(studiedMinutes / 5);

      xpEarned = rewardChunks * 10;
      coinsEarned = rewardChunks * 5;
      happinessEarned = rewardChunks * 5;
    }

    const user = await User.findById(req.user._id);

    user.xp += xpEarned;
    user.coins += coinsEarned;

    user.happiness = Math.min(100, user.happiness + happinessEarned);

    while (user.xp >= user.level * 100) {
      user.xp -= user.level * 100;
      user.level += 1;
    }

    await user.save();

    if (subjectId) {
      const subject = await Subject.findOne({
        _id: subjectId,
        owner: req.user._id,
      });

      if (subject) {
        subject.totalStudyTime += studiedMinutes;
        await subject.save();
      }
    }

    const userObject = user.toObject();
    delete userObject.hashedPassword;

    res.status(200).json({
      xpEarned,
      coinsEarned,
      happinessEarned,
      rewardAllowed,
      user: userObject,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
