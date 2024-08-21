const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products

router.get('/', async(req, res) => {
  try {
    const CategoryData = await Category.findAll({include: [Product]});
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.get('/:id', async(req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include:[Product]
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find one category by its `id` value
  // be sure to include its associated Products


router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // create a new category


router.put('/:id', (req, res) => {
  Category.update(
    req.body,
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
  // update a category by its `id` value


router.delete('/:id', async(req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete a category by its `id` value


module.exports = router;
