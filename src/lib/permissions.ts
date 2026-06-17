import { User } from '@/types/auth';

export function hasPermission(
  user: User | null,
  permission: string
): boolean {
  if (!user?.permissions) return false;

  return user.permissions.includes('*') || user.permissions.includes(permission);
}