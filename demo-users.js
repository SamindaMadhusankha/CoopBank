// Demo users for offline mode (when MongoDB is unavailable)
const demoUsers = {
  admin01: {
    _id: 'demo-admin-001',
    username: 'admin01',
    name: 'Admin User',
    email: 'admin@cooperativebank.com',
    password: 'Admin@123', // Plain text for demo
    role: 'admin',
    memberId: 'CCB-ADM-01',
    branch: 'Head Office',
    status: 'Active',
    focus: 'Administration',
    portfolio: {
      stats: [
        { label: 'Total Members', value: '150+', trend: 'Growing' },
        { label: 'Active Loans', value: 'LKR 5.2M', trend: 'Stable' },
        { label: 'Total Savings', value: 'LKR 12.8M', trend: 'Increasing' }
      ],
      activities: [],
      tasks: [],
      documents: []
    }
  },
  savindi: {
    _id: 'demo-member-001',
    username: 'savindi',
    name: 'Savindi Perera',
    email: 'savindi@email.com',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-001',
    branch: 'Kurunegala City',
    status: 'Active',
    focus: 'Savings',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 25,000.00', trend: 'Growing' },
        { label: 'Outstanding loans', value: 'LKR 0.00', trend: 'No data' },
        { label: 'Projected dividends', value: 'LKR 1,250.00', trend: 'Quarterly' }
      ],
      activities: [],
      tasks: [],
      documents: []
    }
  },
  nuwan: {
    _id: 'demo-member-002',
    username: 'nuwan',
    name: 'Nuwan Silva',
    email: 'nuwan@email.com',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-002',
    branch: 'Matara Coastal',
    status: 'Pending',
    focus: 'Loans',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 10,000.00', trend: 'New account' },
        { label: 'Outstanding loans', value: 'LKR 0.00', trend: 'No data' },
        { label: 'Projected dividends', value: 'LKR 0.00', trend: 'Pending approval' }
      ],
      activities: [],
      tasks: [],
      documents: []
    }
  },
  priya: {
    _id: 'demo-member-003',
    username: 'priya',
    name: 'Priya Jayasumana',
    email: 'priya@email.com',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-003',
    branch: 'Jaffna Hub',
    status: 'Active',
    focus: 'Investment',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 50,500.00', trend: 'Growing' },
        { label: 'Outstanding loans', value: 'LKR 15,000.00', trend: 'On track' },
        { label: 'Projected dividends', value: 'LKR 2,525.00', trend: 'Quarterly' }
      ],
      activities: [],
      tasks: [],
      documents: []
    }
  },
  kasun: {
    _id: 'demo-member-004',
    username: 'kasun',
    name: 'Kasun Bandara',
    email: 'kasun@email.com',
    password: 'Member@123',
    role: 'member',
    memberId: 'CCB-MEM-004',
    branch: 'Anuradhapura Central',
    status: 'Suspended',
    focus: 'General',
    portfolio: {
      stats: [
        { label: 'Savings balance', value: 'LKR 8,750.00', trend: 'Suspended' },
        { label: 'Outstanding loans', value: 'LKR 50,000.00', trend: 'Overdue' },
        { label: 'Projected dividends', value: 'LKR 0.00', trend: 'Suspended' }
      ],
      activities: [],
      tasks: [],
      documents: []
    }
  }
};

// Helper function to get user by username
function getDemoUser(username) {
  return demoUsers[username.toLowerCase().trim()];
}

// Helper function to verify demo user credentials
function verifyDemoUser(username, password) {
  const user = getDemoUser(username);
  if (!user || user.password !== password) {
    return null;
  }
  // Return user without password
  const userCopy = { ...user };
  delete userCopy.password;
  return userCopy;
}

module.exports = {
  demoUsers,
  getDemoUser,
  verifyDemoUser
};
