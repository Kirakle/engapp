// const { Router } = require('express');
// const router = Router();
// const User = require('../models/User');

// router.post('/registration', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const isUsed = await User.findOne({ email });

//     if (isUsed) {
//       return res.status(300).json({ message: 'Данный Email уже занят, попробуйте другой.' });
//     }
//     const user = new User({
//       email,
//       password,
//     });

//     await user.save();

//     res.status(201).json({ message: 'Пользователь создан' });
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Category = require('../models/Word');

// Маршрут для получения всех слов
router.get('/words', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Маршрут для обновления isLearn
router.put('/words/:wordId', async (req, res) => {
  const { wordId } = req.params;
  console.log(wordId);
  try {
    const category = await Category.findOne({ 'words.idd': wordId });
    if (!category) {
      return res.status(404).send('Word not found');
    }

    // const word = category.words.find((word) => {
    //   return word.idd === wordId;
    // });

    let word;

    category.words.forEach((element) => {
      if (JSON.parse(JSON.stringify(element))['idd'] == wordId) {
        word = element;
      }
    });
    word.isLearn = !word.isLearn;
    await category.save();

    res.json(word);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
