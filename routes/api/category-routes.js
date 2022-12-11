const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    if (!category) {
      res.status(404).json({message: 'Could not find category with that id'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(updateCategory);
  } catch (err) {
    res.status(400).json(err);
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({message: 'Could not find category with this id'});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500),json(err);
  }
});

module.exports = router;
