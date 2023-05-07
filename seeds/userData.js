const { User } = require('../models');

const userData = [{}];

const seedUser = () => User.Create(userData);