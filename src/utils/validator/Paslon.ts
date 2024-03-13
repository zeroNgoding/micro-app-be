import Joi from "joi";

export const PaslonValidator = Joi.object({
  name: Joi.string().required(),
  no_urut: Joi.string().required(),
  vm: Joi.array().required(),
  image: Joi.string().required(),
});
