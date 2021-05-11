const express = require('express');
const State = require('../../models/State');
const router = express();
const isLength = require('validator/lib/isLength');

router.get('/', async (req, res) => {
  try {
    const States = await State.find();

    res.status(200).json(States);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  console.log(req.body);

  const { state } = req.body;
  try {
    if (!isLength(state, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }

    // 1.Check if user already exist in db
    const user = await State.findOne({ state });
    if (user) {
      return res.status(422).send(`state already exist with name ${state}`);
    }
    // 3.create state
    const newState = await new State({
      state,
    }).save();
    res.status(201).send('successfull');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
