const { body } = require("express-validator");

//Pega os campos do body e verificam se estão no formato certo
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("o nome é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("o nome precisa ter no minimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("o email é obrigatorio")
      .isEmail()
      .withMessage("O email está invalido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("a senha tem que ter no minimo 5 caracteres"),
    body("confirmpassword")
      .isString()
      .withMessage("a senha de confirmação é obrigatoria")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("o email é obrigatorio")
      .isEmail()
      .withMessage("Digite um email válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
};
