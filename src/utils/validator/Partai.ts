import Joi from "joi";

export const PartaiValidator = Joi.object({
  name: Joi.string().required(),
  chairman: Joi.string().required(),
  vm: Joi.string().required(),
  address: Joi.string().required(),
  logo: Joi.string().required(),
  paslon: Joi.number().required(),
});
