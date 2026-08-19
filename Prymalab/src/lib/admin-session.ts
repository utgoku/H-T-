import 'server-only';
import { createHmac, createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'prymalab_admin_session';
const SESSION_PAYLOAD = 'prymalab-admin-v1';

function configuredSecret() {
  return process.env.PRYMALAB_ADMIN_SESSION_SECRET?.trim() || '';
}

export function isAdminConfigured() {
  return Boolean(process.env.PRYMALAB_ADMIN_PASSWORD?.trim() && configuredSecret());
}

export function adminToken() {
  const secret = configuredSecret();
  if (!secret) return '';
  return createHmac('sha256', secret).update(SESSION_PAYLOAD).digest('hex');
}

export function adminPasswordMatches(candidate: string) {
  const expected = process.env.PRYMALAB_ADMIN_PASSWORD?.trim() || '';
  if (!expected || !candidate) return false;
  const candidateHash = createHash('sha256').update(candidate).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

export async function hasAdminSession() {
  if (!isAdminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE_NAME)?.value || '';
  const expected = adminToken();
  if (!value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
