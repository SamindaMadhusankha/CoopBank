require('dotenv').config();

// Use Google DNS for MongoDB SRV resolution
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const User = require('./models/User');

const seedUsers = [
  {
    username: 'admin01',
    name: 'Dilshan Perera',
    email: 'dilshan.perera@coopbank.lk',
    password: 'Admin@123',
    role: 'admin',
    memberId: 'CCB-ADM-01',
    branch: 'Head Office',
    status: 'Active',
    focus: 'Digital Banking Enablement',
    portfolio: {
      stats: [
        { label: 'Users onboarded', value: '5', trend: 'Pilot cohort' },
        { label: 'Tasks awaiting review', value: '7', trend: 'Prioritize high risk' },
        { label: 'Tickets open', value: '3', trend: 'Respond today' }
      ],
      activities: [
        { time: '17 Dec 2025 · 10:02', detail: 'Reset Kasun Pathirana access', channel: 'Admin console' },
        { time: '17 Dec 2025 · 18:31', detail: 'Approved SME document uploads', channel: 'Admin console' },
        { time: '16 Dec 2025 · 09:12', detail: 'Exported audit trail for regulator', channel: 'Audit log' }
      ],
      tasks: [
        { item: 'Review suspended members', due: 'Due today' },
        { item: 'Publish December rates', due: 'Due tomorrow' }
      ],
      documents: [
        { name: 'December audit summary', status: 'Ready' },
        { name: 'Portal change log', status: 'In review' }
      ]
    }
  },
  {
    username: 'savindi',
    name: 'Savindi Jayasena',
    email: 'savindi.jayasena@coopbank.lk',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-204',
    branch: 'Kurunegala City',
    status: 'Active',
    focus: 'Women Entrepreneur Pod',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 1.28M', trend: '+4.5% QoQ' },
        { label: 'Outstanding loans', value: 'LKR 450,000', trend: 'On track' },
        { label: 'Projected dividends', value: 'LKR 84,000', trend: 'Next credit 31 Dec' }
      ],
      activities: [
        { time: '17 Dec 2025 · 09:22', detail: 'Uploaded supplier invoices for SME recovery loan', channel: 'Portal upload' },
        { time: '12 Dec 2025 · 15:37', detail: 'Dividend payout credited to Champion Saver', channel: 'Core banking' },
        { time: '08 Dec 2025 · 11:04', detail: 'WhatsApp chat with relationship officer', channel: 'WhatsApp' }
      ],
      tasks: [
        { item: 'Submit quarterly sales report', due: 'Due in 2 days' },
        { item: 'Sign MSME advisory charter', due: 'Awaiting signature' }
      ],
      documents: [
        { name: 'Women entrepreneur grant addendum', status: 'Approved' },
        { name: 'Standing order change request', status: 'Processing' }
      ]
    }
  },
  {
    username: 'nuwan',
    name: 'Nuwan Madushan',
    email: 'nuwan.madushan@coopbank.lk',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-311',
    branch: 'Matara Coastal',
    status: 'Pending',
    focus: 'Agri Modernization Loan',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 640,000', trend: '+2.1% QoQ' },
        { label: 'Outstanding loans', value: 'LKR 980,000', trend: 'Action required' },
        { label: 'Projected dividends', value: 'LKR 31,500', trend: 'Pending approval' }
      ],
      activities: [
        { time: '16 Dec 2025 · 14:10', detail: 'Resubmitted land title for agri modernization loan', channel: 'Branch upload' },
        { time: '10 Dec 2025 · 10:45', detail: 'Call with Matara branch credit officer', channel: 'Voice' },
        { time: '04 Dec 2025 · 08:25', detail: 'Updated collateral valuation', channel: 'Portal form' }
      ],
      tasks: [
        { item: 'Upload irrigation project budget', due: 'Due tomorrow' },
        { item: 'Confirm guarantor NIC copies', due: 'Pending' }
      ],
      documents: [
        { name: 'Crop insurance renewal', status: 'Approved' },
        { name: 'Seasonal overdraft request', status: 'Returned' }
      ]
    }
  },
  {
    username: 'priya',
    name: 'Priya Balendra',
    email: 'priya.balendra@coopbank.lk',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-087',
    branch: 'Jaffna Hub',
    status: 'Active',
    focus: 'Youth Skills Savings Plan',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 410,000', trend: '+9.8% QoQ' },
        { label: 'Outstanding loans', value: 'LKR 180,000', trend: 'On track' },
        { label: 'Projected dividends', value: 'LKR 24,000', trend: 'Credit on 05 Jan' }
      ],
      activities: [
        { time: '18 Dec 2025 · 08:12', detail: 'Activated youth skills auto-deposit', channel: 'Portal automation' },
        { time: '11 Dec 2025 · 16:47', detail: 'Requested English + Tamil statements', channel: 'Portal request' },
        { time: '02 Dec 2025 · 13:30', detail: 'Completed digital literacy assessment', channel: 'Learning hub' }
      ],
      tasks: [
        { item: 'Download scholarship confirmation letter', due: 'Available now' },
        { item: 'Answer financial literacy quiz', due: 'Due next week' }
      ],
      documents: [
        { name: 'Scholarship remittance letter', status: 'Ready' },
        { name: 'Standing order instructions', status: 'Approved' }
      ]
    }
  },
  {
    username: 'kasun',
    name: 'Kasun Pathirana',
    email: 'kasun.pathirana@coopbank.lk',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-452',
    branch: 'Anuradhapura Central',
    status: 'Suspended',
    focus: 'Livestock Revival Package',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 220,000', trend: '-3.1% QoQ' },
        { label: 'Outstanding loans', value: 'LKR 320,000', trend: 'Review pending' },
        { label: 'Projected dividends', value: 'LKR 12,200', trend: 'Suspended' }
      ],
      activities: [
        { time: '15 Dec 2025 · 17:54', detail: 'Credit risk flagged livestock portfolio', channel: 'Risk engine' },
        { time: '09 Dec 2025 · 09:18', detail: 'Schedule created for post-flood inspection', channel: 'Field app' },
        { time: '01 Dec 2025 · 07:45', detail: 'Emergency relief top-up approved', channel: 'Head office' }
      ],
      tasks: [
        { item: 'Upload veterinary clearance', due: 'Due in 4 days' },
        { item: 'Confirm insurance payout details', due: 'Awaiting member' }
      ],
      documents: [
        { name: 'Livestock revival statement', status: 'Pending' },
        { name: 'Collateral inspection report', status: 'In progress' }
      ]
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert seed users
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${userData.username} (${userData.role})`);
    }

    console.log('\nSeed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('  Admin:  admin01 / Admin@123');
    console.log('  Member: savindi / Member@123');
    console.log('  Member: nuwan   / Member@123');
    console.log('  Member: priya   / Member@123');
    console.log('  Member: kasun   / Member@123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
