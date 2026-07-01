const DEFAULT_ADMIN_PASSWORD = "MartinAdmin2026!";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export function isValidAdminPassword(password: string) {
  return password === getAdminPassword();
}
