const router = require("express").Router();
const shoesController = require("../controllers/shoesController");

//Registration new shoes;
router.post("/registration", shoesController.addNewShoes);

//Get all shoes
router.get("/get-all", shoesController.getAllShoes);
//Delete shoes
router.delete("/delete", shoesController.deleteShoes);

//Get shoes by page indexes
router.get("/get-by-page", shoesController.getShoesByPagination);

//Get shoes by id
router.get("/get-by-id", shoesController.getShoesById);

//Update shoes by ids
router.put("/update-by-id", shoesController.updateShoesById);

//Search by characters
router.get("/search-characters/:txtSearch", shoesController.searchByCharacters);

//Search by name
router.get("/search", shoesController.searchByName);
module.exports = router;
