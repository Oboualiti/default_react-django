export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value !== '';
}
