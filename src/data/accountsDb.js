// Local Accounts Database for CHMSU Digital Repository
// Persisted in browser localStorage under 'chmsu_accounts'

export const initialAccounts = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@chmsu.edu.ph',
    password: 'admin123',
    name: 'John Doe',
    role: 'Administrator',
    department: 'Management Information System',
    avatar: 'JD'
  },
  {
    id: 2,
    username: 'r.santos',
    email: 'r.santos@chmsu.edu.ph',
    password: 'password123',
    name: 'R. Santos',
    role: 'Faculty Researcher',
    department: 'College of Arts & Sciences',
    avatar: 'RS'
  },
  {
    id: 3,
    username: 'l.delacruz',
    email: 'l.delacruz@chmsu.edu.ph',
    password: 'password123',
    name: 'L. Dela Cruz',
    role: 'Department Reviewer',
    department: 'Office of Student Affairs',
    avatar: 'LD'
  }
];

export function getAccounts() {
  const stored = localStorage.getItem('chmsu_accounts');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse chmsu_accounts, resetting to default.', e);
    }
  }
  // Initialize with seed accounts
  localStorage.setItem('chmsu_accounts', JSON.stringify(initialAccounts));
  return initialAccounts;
}

export function saveAccounts(accounts) {
  localStorage.setItem('chmsu_accounts', JSON.stringify(accounts));
}

export function authenticateUser(identifier, password) {
  const accounts = getAccounts();
  const trimmedId = (identifier || '').trim().toLowerCase();
  
  // Find account by either username or email
  const user = accounts.find(
    (acc) =>
      acc.username.toLowerCase() === trimmedId ||
      acc.email.toLowerCase() === trimmedId
  );

  if (!user) {
    return {
      success: false,
      message: 'Account not found. Please check your username or email.'
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Hint: default password is admin123'
    };
  }

  // Create safe user object (omit password)
  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    department: user.department,
    avatar: user.avatar || user.name.slice(0, 2).toUpperCase()
  };

  setCurrentSession(safeUser);
  return {
    success: true,
    user: safeUser
  };
}

export function getCurrentSession() {
  const session = localStorage.getItem('chmsu_auth_user');
  if (session) {
    try {
      return JSON.parse(session);
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function setCurrentSession(user) {
  localStorage.setItem('chmsu_auth_user', JSON.stringify(user));
}

export function clearCurrentSession() {
  localStorage.removeItem('chmsu_auth_user');
}
