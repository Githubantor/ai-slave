import User from '../models/User.js';
import Organization from '../models/Organization.js';
import { generateToken } from '../middleware/auth.js';
import AIEmployee from '../models/AIEmployee.js';
import Settings from '../models/Settings.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const user = await User.create({ name, email, password, avatar: initials });

    const org = await Organization.create({ name: `${name}'s Company`, owner: user._id });
    user.organization = org._id;
    await user.save();

    await Settings.create({ organization: org._id });

    const defaultAgents = [
      { name: 'CEO AI', role: 'Chief Executive Officer', avatar: 'CE', color: 'from-purple-500 to-pink-500', currentTask: 'Monitoring business operations', organization: org._id },
      { name: 'Marketing AI', role: 'Chief Marketing Officer', avatar: 'MA', color: 'from-rose-500 to-orange-500', currentTask: 'Analyzing market trends', organization: org._id },
      { name: 'Sales AI', role: 'Chief Revenue Officer', avatar: 'SA', color: 'from-emerald-500 to-teal-500', currentTask: 'Researching prospects', organization: org._id },
      { name: 'Research AI', role: 'Head of Research', avatar: 'RE', color: 'from-blue-500 to-cyan-500', currentTask: 'Market analysis', organization: org._id },
      { name: 'Developer AI', role: 'Chief Technology Officer', avatar: 'DE', color: 'from-sky-500 to-indigo-500', currentTask: 'Building systems', organization: org._id },
      { name: 'Operations AI', role: 'Chief Operations Officer', avatar: 'OP', color: 'from-amber-500 to-yellow-500', currentTask: 'Optimizing workflows', organization: org._id },
      { name: 'Finance AI', role: 'Chief Financial Officer', avatar: 'FI', color: 'from-green-500 to-emerald-500', currentTask: 'Financial planning', organization: org._id },
      { name: 'HR AI', role: 'Head of People', avatar: 'HR', color: 'from-violet-500 to-purple-500', currentTask: 'Team management', organization: org._id },
    ];
    await AIEmployee.insertMany(defaultAgents);

    const userData = await User.findById(user._id).populate('organization');
    const token = generateToken(user._id);
    res.status(201).json({ token, user: userData });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const userData = await User.findById(user._id).populate('organization');
    const token = generateToken(user._id);
    res.json({ token, user: userData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('organization');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
