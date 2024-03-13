import Joi from "joi";

export const AuthValidator = Joi.object({
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  listas: Joi.string().required(),
  gender: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
