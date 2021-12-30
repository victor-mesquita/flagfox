export default function validate(yupSchema) {
  return async (req, res, next) => {
    const resource = req.body;
    try {
      await yupSchema.validate(resource);
      next();
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: e.errors.join(', ') });
    }
  };
}
