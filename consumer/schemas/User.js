import Joi from "joi";

const user = {
  email: Joi.string().required(),
  nome: Joi.string().required(),
  administrador: Joi.boolean().required(),
  _id: Joi.string().required(),
  password: Joi.string().required(),
};

export const getUsers = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array().items(Joi.object(user)).required(),
});

export const getUserFromId = Joi.object(user);
