const User = require('../models/user.model');

class UserService {
    async createUser(data) {
        const user = new User(data);
        await user.save();
        return user;
    }

    async getAllUsers() {
        return await User.find({});
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUser(userId, data) {
        return await User.findByIdAndUpdate(userId, data, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserService();