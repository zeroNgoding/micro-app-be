import Joi from "joi";

export const ArticleValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
  author: Joi.number().required(),
});
