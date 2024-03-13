import Joi from "joi";

export const VoteValidator = Joi.object({
  title: Joi.string().required(),
  user: Joi.number().required(),
  paslon: Joi.number().required()
});
