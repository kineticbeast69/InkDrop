import Joi from "joi";

const loginSchema = Joi.object({
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

const LoginMiddleware = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(409).json({ message: error.details[0].message });
  next();
};

export default LoginMiddleware;
