module.exports = {
  verifyJoiSchema: async (data, schema) => {
    try {
      const validation = await schema.validate(data);
      if (validation.error) {
        throw validation.error;
      }
      return validation.value;
    } catch (error) {
      throw error;
    }
  },
};
