const Joi = require('joi');

// Définition du schéma de validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Le format de l’adresse email est invalide.',
        'any.required': 'L’email est obligatoire.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
        'any.required': 'Le mot de passe est obligatoire.'
    })
});

exports.validateLoginData = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
