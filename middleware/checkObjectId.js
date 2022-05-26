/**
 * @author Jordan Satterfield
 * @description Verifies that an object ID is a valid object ID.
 */

const mongoose = require('mongoose');

const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid ID' });
  next();
};

module.exports = checkObjectId;