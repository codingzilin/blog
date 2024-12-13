import User from '../models/user.model.js';

const updateUsers = async () => {
  try {
    // Update all user documents that don't have isAdmin field
    await User.updateMany(
      { isAdmin: { $exists: false } },
      { $set: { isAdmin: false } }
    );
    console.log('Users updated successfully');
  } catch (error) {
    console.error('Error updating users:', error);
  }
};

export default updateUsers; 