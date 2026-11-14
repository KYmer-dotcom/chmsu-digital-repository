// Local Accounts Database for CHMSU Digital Repository
// Persisted in browser localStorage under 'chmsu_accounts'

export const initialAccounts = [
  {
    id: 1,
    username: 'records',
    email: 'records@chmsu.edu.ph',
    password: 'admin123',
    name: 'Records Office',
    role: 'Records Office',
    officeName: 'Records Office',
    department: 'Records Management',
    avatar: 'RO',
    canManageStorage: true,
    canProcessRequests: false
  },
  {
    id: 2,
    username: 'registrar',
    email: 'registrar@chmsu.edu.ph',
    password: 'registrar123',
    name: 'Registrar Office',
    role: 'Registrar',
    officeName: 'Registrar Office',
    department: 'Office of the Registrar',
    avatar: 'RO',
    canManageStorage: false,
    canProcessRequests: true
  },
  // Support 'admin' as an alias for the Records Office
  {
    id: 3,
    username: 'admin',
    email: 'admin@chmsu.edu.ph',
    password: 'admin123',
    name: 'Records Office',
    role: 'Records Office',
    officeName: 'Records Office',
    department: 'Records Management',
    avatar: 'RO',
    canManageStorage: true,
    canProcessRequests: false
  }
];

export function getAccounts() {
  const stored = localStorage.getItem('chmsu_accounts');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.some((a) => a.username === 'registrar')) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse chmsu_accounts, resetting to default.', e);
    }
  }
  localStorage.setItem('chmsu_accounts', JSON.stringify(initialAccounts));
  return initialAccounts;
}

export function saveAccounts(accounts) {
  localStorage.setItem('chmsu_accounts', JSON.stringify(accounts));
}

export function authenticateUser(identifier, password) {
  const accounts = getAccounts();
  const trimmedId = (identifier || '').trim().toLowerCase();
  
  const user = accounts.find(
    (acc) =>
      acc.username.toLowerCase() === trimmedId ||
      acc.email.toLowerCase() === trimmedId
  );

  if (!user) {
    return {
      success: false,
      message: 'Account not found. Use "records" or "registrar".'
    };
  }

  if (user.password !== password) {
    const hint = user.username === 'registrar' ? 'registrar123' : 'admin123';
    return {
      success: false,
      message: `Incorrect password. Hint: default password is ${hint}`
    };
  }

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    officeName: user.officeName,
    department: user.department,
    avatar: user.avatar || 'RO',
    canManageStorage: user.canManageStorage,
    canProcessRequests: user.canProcessRequests
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
      const parsed = JSON.parse(session);
      const isReg = parsed.username === 'registrar' || parsed.role === 'Registrar';
      const updated = {
        ...parsed,
        name: isReg ? 'Registrar Office' : 'Records Office',
        role: isReg ? 'Registrar' : 'Records Office',
        officeName: isReg ? 'Registrar Office' : 'Records Office',
        avatar: 'RO'
      };
      localStorage.setItem('chmsu_auth_user', JSON.stringify(updated));
      return updated;
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
