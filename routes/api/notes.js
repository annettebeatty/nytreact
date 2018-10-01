const router = require("express").Router();
const notesController = require("../../controllers/notesController");

// Matches with "/api/notes"
router.route("/")
  .get(notesController.findAll)
  .post(notesController.create);
// Matches with "/api/notes/:id"

router
  .route("/:id")
  .delete(notesController.remove);

module.exports = router;
