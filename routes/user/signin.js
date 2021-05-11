const express = require('express');
const router = express();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  try {
    // 1.check if user exist in db
    const user = await User.findOne({ name }).select('+password');

    // 2. if not exist return error
    if (!user) {
      return res.status(404).send('No user exist with that email');
    }

    // 3. check to see if users password matches in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log('user exist');
    // 4.if so generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
        expiresIn: '7d',
      });
      // 5. send that token to the client

      res.status(200).json({ token, name: user.name });
    } else {
      res.status(401).send('Passwords not match');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
});
module.exports = router;
