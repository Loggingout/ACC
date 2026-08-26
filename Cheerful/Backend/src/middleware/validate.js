// validate.js — wraps a zod schema and validates req.body/query/params
const { AppError } = require('../utils/errors');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(AppError.badRequest('Validation failed', result.error.flatten().fieldErrors));
    }
    req[source] = result.data;
    next();
  };
}

module.exports = validate;
