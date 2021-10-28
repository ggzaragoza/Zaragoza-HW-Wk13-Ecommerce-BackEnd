const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

      if (!getCategory) {
        res.status(404).json({ message: 'No category with this ID!' });
        return;
      };

    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({ 
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CATEGORY BY ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    });

      if (!updatedCategory[0]) {
        res.status(404).json({ message: 'No category with this ID!' });
        return;
      };

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CATEGORY BY ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

      if (!deleteCategory) {
        res.status(404).json({ message: 'No category with this ID!' });
        return;
      };

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
