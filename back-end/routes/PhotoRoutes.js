const express = require("express");
const router = express.Router();

//Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotosUser,
  getPhotosById,
  updatePhoto,
  likePhoto,
  comentPhoto,
  searchPhotos,
} = require("../controllers/PhotoController");

//Middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.get("/search", authGuard, searchPhotos);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getPhotosUser);
router.get("/:id", authGuard, getPhotosById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  comentPhoto
);
module.exports = router;
