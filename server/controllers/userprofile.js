const UserProfile = require('../models/userprofile');

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, bio } = req.body;
    let avatar;
    if (req.file) {
      avatar = req.file.path; // Cloudinary URL
    }

    const updateData = { name, bio };
    if (avatar) {
      updateData.avatar = avatar;
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    console.error(error.stack);
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };