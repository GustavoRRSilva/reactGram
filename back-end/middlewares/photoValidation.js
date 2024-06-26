const { body } = require("express-validator");

//Faz as validações da foto
const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O titulo precisa ter no mínimo 3 caracteres."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O titulo é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("O titulo precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
 return[
    body("comment").isString().withMessage("O comentário é obrigatorio")
 ]
};
module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation
};
