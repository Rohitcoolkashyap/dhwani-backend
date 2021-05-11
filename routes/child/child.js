const express = require('express');
const Child = require('../../models/Child');
const router = express();
const isLength = require('validator/lib/isLength');

router.get('/', async (req, res) => {
  try {
    const Children = await Child.find();

    res.status(200).json(Children);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  console.log(req.body);

  const { name, sex, dob, father, mother, state, district } = req.body;
  try {
    //   0. validate name ,email,password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(dob, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(sex, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(father, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(mother, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(state, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }
    if (!isLength(district, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }

    // 1.Check if user already exist in db
    const user = await Child.findOne({ name });
    if (user) {
      return res.status(422).send(`User already exist with name ${name}`);
    }
    // 3.create user
    const newChild = await new Child({
      name,
      sex,
      dob,
      father,
      mother,
      state,
      district,
    }).save();
    res.status(201).send('successfull');
    ses;
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
