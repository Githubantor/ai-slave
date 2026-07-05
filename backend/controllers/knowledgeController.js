import Document from '../models/Document.js';

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ organization: req.user.organization }).sort('-createdAt');
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const doc = await Document.create({ ...req.body, organization: req.user.organization, uploadedBy: req.user._id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, organization: req.user.organization });
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
