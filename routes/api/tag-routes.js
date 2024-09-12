const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const TagData = await Tag.findAll({ include: [Product] });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find all tags
// be sure to include its associated Product data

router.get("/:id", async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [Product],
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
// be sure to include its associated Product data

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// create a new tag

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    // Gets a book based on the book_id given in the request parameters
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// update a tag's name by its `id` value

router.delete("/:id", async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value

module.exports = router;
