import Joi from "joi";

const addNoteSchema = Joi.object({
  //addnote schema
  title: Joi.string().trim().min(8).required().messages({
    "any.required": "PLease write some title",
    "string.min": "Please title must have 8 characters.",
  }),
  content: Joi.string().trim().min(8).required().messages({
    "any.required": "Please write some content.",
    "string.min": "Please content must have 8 characters.",
  }),
  tags: Joi.array().items(
    Joi.string().trim().required().messages({
      "any.required": "Tags is required.",
    })
  ),
  userID: Joi.string().trim().required(),
});
const addNoteMiddleware = (req, res, next) => {
  const { error } = addNoteSchema.validate(req.body); //addnote validation
  if (error) return res.status(409).json({ message: error.details[0].message });
  next();
};
export default addNoteMiddleware;
