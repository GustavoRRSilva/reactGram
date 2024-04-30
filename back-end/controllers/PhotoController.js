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
    console.log(photo);
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

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

const getPhotosUser = async (req, res) => {
  const user = req.user;
  const userId = user._id;
  console.log(userId);
  const photosUser = await Photo.find({
    userId: userId,
  })
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photosUser);
};

const getPhotosById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
  res.status(200).json(photo);
};
//Update Photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(title);
  const reqUser = req.user;

  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["Ocorreu um erro, tente mais tarde"] });
    return;
  }
  if (title) {
    photo.title = title;
  }
  await photo.save();
  res.status(200).json({
    photo,
    message: "Foto atualizada com sucesso",
  });
};

//Like functionality
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const userId = user._id;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }

  //Check if already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu a foto"] });
    return;
  }
  //Put user id in likes array
  photo.likes.push(reqUser._id);
  photo.save();
  res
    .status(200)
    .json({ photoId: id, userId: userId, message: "A foto foi curtida" });
};

const comentPhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const userId = reqUser._id;
  const { comment } = req.body;
  const photo = await Photo.findById(id);
  const user = await User.findById(userId);
  if (!photo) {
    res.status(404).json({ error: ["A foto não existe"] });
  }
  //Put comment in the array comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: userId,
  };

  photo.comments.push(userComment);
  await photo.save();
  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso",
  });
};
module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotosUser,
  getPhotosById,
  updatePhoto,
  likePhoto,
  comentPhoto
};
