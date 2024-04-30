const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");
//insert a photo, with an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  //Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //If photo was created with sucessfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, favor tentar mais tarde"],
    });
  }
  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const photo = await Photo.findById(id);
    console.log(photo)
    if (!photo) {
      res.status(404).json({ errors: ["Photo não encontrada"] });
      return;
    }
    //Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, por favor tente mais tarde"] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo.id, message: "Foto excluída com sucesso" });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

module.exports = { insertPhoto, deletePhoto };
