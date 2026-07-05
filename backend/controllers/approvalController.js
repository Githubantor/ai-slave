import Approval from '../models/Approval.js';
import ActivityLog from '../models/ActivityLog.js';

export const getApprovals = async (req, res) => {
  try {
    const filter = { organization: req.user.organization };
    if (req.query.status) filter.status = req.query.status;
    const approvals = await Approval.find(filter).sort('-createdAt');
    res.json(approvals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createApproval = async (req, res) => {
  try {
    const approval = await Approval.create({ ...req.body, organization: req.user.organization });
    res.status(201).json(approval);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const approval = await Approval.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { status: 'approved', reviewedBy: req.user._id },
      { new: true }
    );
    if (!approval) return res.status(404).json({ message: 'Approval not found' });
    await ActivityLog.create({
      agent: 'Owner', action: 'approved request', detail: approval.title,
      organization: req.user.organization, icon: 'check-circle',
    });
    res.json(approval);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const approval = await Approval.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { status: 'rejected', reviewedBy: req.user._id },
      { new: true }
    );
    if (!approval) return res.status(404).json({ message: 'Approval not found' });
    await ActivityLog.create({
      agent: 'Owner', action: 'rejected request', detail: approval.title,
      organization: req.user.organization, icon: 'x-circle',
    });
    res.json(approval);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
