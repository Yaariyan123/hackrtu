const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      name: 'Somya',
      email: 'asomiy100@gmail.com',
      mobile: '9999999999',
      gender: 'Female',
      college: 'Admin College',
      course: 'Administration',
      graduationYear: 2025,
      password: 'admin123456',
      role: 'admin',
    };

    let admin = await User.findOne({ email: adminData.email });
    if (admin) {
      console.log('Admin already exists:', adminData.email);
      await mongoose.connection.close();
      process.exit(0);
    }

    admin = new User(adminData);
    await admin.save();

    console.log('Admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();