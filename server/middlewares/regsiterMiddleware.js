import Joi from "joi";

const registerSchema = Joi.object({
  //register page schema for validation
  username: Joi.string().trim().min(8).max(25).required().messages({
    "any.required": "Username is required.",
    "string.min": "Username must have 8 characters.",
    "string.max": "Username must be less than 25 characters.",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Enter valid email address.",
  }),
  password: Joi.string().trim().min(8).max(15).required().messages({
    "any.required": "Password is required.",
    "string.min": "Password must have 8 characters.",
    "string.max": "Password must be less than 15 characters.",
  }),
});

const registerMiddleware = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(409).json({ message: error.details[0].message });
  next();
};

export default registerMiddleware;
