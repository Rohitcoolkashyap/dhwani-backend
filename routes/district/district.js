const express = require('express');
const District = require('../../models/District');
const router = express();
const isLength = require('validator/lib/isLength');

router.get('/', async (req, res) => {
  try {
    const Districts = await District.find();

    res.status(200).json(Districts);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  console.log(req.body);

  const { name, district } = req.body;
  try {
    //   0. validate name ,email,password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }

    if (!isLength(district, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long');
    }

    // 1.Check if user already exist in db
    const user = await District.findOne({ name });
    if (user) {
      return res.status(422).send(`User already exist with name ${district}`);
    }
    // 3.create user
    const newDistrict = await new District({
      name,

      district,
    }).save();
    res.status(201).send('successfull');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
