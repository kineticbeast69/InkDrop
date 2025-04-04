import Joi from "joi";

const updateNoteSchema = Joi.object({
  title: Joi.string().trim().min(8).required().messages({
    "any.required": "Please write the title.",
    "string.min": "Please title must atleast 8 characters.",
  }),
  content: Joi.string().trim().min(8).required().messages({
    "any.required": "PLease write some Content.",
    "string.min": "Please content atleast must have 8 characters.",
  }),
  notesID: Joi.string().trim().required(),
});

const updateNotesMiddlewares = (req, res, next) => {
  const { error } = updateNoteSchema.validate(req.body);
  if (error) return res.status(409).json({ mesage: error.details[0].message });
  next();
};
export default updateNotesMiddlewares;
