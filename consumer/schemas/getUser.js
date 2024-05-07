import Joi from "joi";

export const getUser = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().required(),
        nome: Joi.string().required(),
        administrador: Joi.boolean().required(),
        _id: Joi.string().required(),
        password: Joi.string().required(),
      })
    )
    .required(),
});
