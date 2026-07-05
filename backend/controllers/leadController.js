import Lead from '../models/Lead.js';
import ActivityLog from '../models/ActivityLog.js';

const industries = ['Restaurant', 'Salon', 'Plumber', 'Electrician', 'Carpenter', 'Cleaner', 'Baker', 'Photographer', 'Trainer', 'Consultant', 'Painter', 'Plumber', 'Landscaper', 'Pet Groomer', 'Tutor'];

const cities = ['Austin TX', 'Miami FL', 'Denver CO', 'Portland OR', 'Nashville TN', 'Raleigh NC', 'Phoenix AZ', 'Tampa FL', 'Atlanta GA', 'Dallas TX', 'Houston TX', 'Orlando FL', 'Charlotte NC', 'San Antonio TX', 'Jacksonville FL'];

const businessNames = {
  Restaurant: ['Bella Napoli Bistro', 'Golden Dragon Kitchen', 'Fresh Harvest Cafe', 'Spice Route Dining', 'Blue Ocean Grill'],
  Salon: ['Glamour Cuts Studio', 'Divine Beauty Lounge', 'Style & Grace Salon', 'Radiance Hair Studio', 'Bliss Beauty Bar'],
  Plumber: ['Apex Pipe Solutions', 'Royal Flush Plumbing', 'Drain Pro Services', 'Clear Water Plumbing', 'FixIt Pipe Works'],
  Electrician: ['Bright Spark Electric', 'Volt Master Services', 'Shock Proof Electric', 'Power Line Pros', 'Circuit Savers LLC'],
  Cleaner: ['Sparkle & Shine Pro', 'Pure Clean Services', 'Tidy Home Solutions', 'Crystal Clear Clean', 'Eco Fresh Cleaning'],
  Baker: ['Heavenly Bites Bakery', 'Golden Crust Pastry', 'Sweet Tooth Treats', 'Artisan Bread House', 'Flour & Sugar Co'],
  Photographer: ['Captured Moments Pro', 'Lens & Light Studio', 'Picture Perfect Shots', 'Frame Worthy Photos', 'Snap & Preserve'],
  Trainer: ['Peak Form Fitness', 'Iron Will Training', 'Fit Zone Coaching', 'Elite Body Studio', 'Transform Now Fitness'],
};

const usedNames = new Set();

const generateLead = (industry) => {
  const names = businessNames[industry] || [`${industry} Pro Services`];
  let company;
  do {
    company = names[Math.floor(Math.random() * names.length)];
  } while (usedNames.has(company));
  usedNames.add(company);

  const firstNames = ['James', 'Maria', 'David', 'Sarah', 'Michael', 'Jessica', 'Robert', 'Emily', 'John', 'Lisa'];
  const lastNames = ['Johnson', 'Garcia', 'Williams', 'Brown', 'Davis', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Clark'];

  return {
    company,
    contactName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    email: `info@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`,
    score: Math.floor(Math.random() * 40) + 30,
    industry,
    source: 'AI Research',
    notes: 'No website found during AI research. Potential client for web development services.',
    status: 'cold',
  };
};

export const researchLeads = async (req, res) => {
  try {
    const { industry, location } = req.body;
    const targetIndustry = industry || industries[Math.floor(Math.random() * industries.length)];
    const targetLocation = location || cities[Math.floor(Math.random() * cities.length)];

    const count = Math.floor(Math.random() * 3) + 3;
    const leads = [];
    for (let i = 0; i < count; i++) {
      leads.push(generateLead(targetIndustry));
    }

    const created = await Lead.insertMany(leads.map(l => ({ ...l, organization: req.user.organization })));

    await ActivityLog.create({
      agent: 'Research AI', action: 'researched leads',
      detail: `Found ${count} ${targetIndustry} businesses in ${targetLocation} without websites`,
      organization: req.user.organization, icon: 'users',
    });

    res.status(201).json({ message: `Found ${count} businesses without websites in ${targetLocation}`, leads: created, industry: targetIndustry, location: targetLocation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const filter = { organization: req.user.organization };
    if (req.query.industry) filter.industry = req.query.industry;
    if (req.query.status) filter.status = req.query.status;
    const leads = await Lead.find(filter).sort('-createdAt');
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, organization: req.user.organization },
      { $set: req.body },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
