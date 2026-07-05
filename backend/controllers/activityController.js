import ActivityLog from '../models/ActivityLog.js';

export const getActivity = async (req, res) => {
  try {
    const activities = await ActivityLog.find({ organization: req.user.organization })
      .sort('-createdAt')
      .limit(parseInt(req.query.limit) || 50);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const entry = await ActivityLog.create({ ...req.body, organization: req.user.organization });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
