import Hashids from 'hashids';

// 1. Minimum length 32 ensures we have enough characters for a UUID look
const salt = "your-private-salt-here"; 
const hashids = new Hashids(salt, 32);

/**
 * Turns a number (e.g., 501) into a string that looks like:
 * "nk09pw21-4mnd-q892-00as-882ndlpqwxsz"
 */
export const encodeToFakeUuid = (id: number): string => {
  const hash = hashids.encode(id); 
  
  // Standard UUID format: 8-4-4-4-12
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    hash.slice(12, 16),
    hash.slice(16, 20),
    hash.slice(20)
  ].join('-');
};

/**
 * Reverses the fake UUID back into a number
 */
export const decodeFromFakeUuid = (fakeUuid: string): number | null => {
  // Remove the dashes first
  const cleanHash = fakeUuid.replace(/-/g, "");
  const decoded = hashids.decode(cleanHash);
  
  return decoded.length > 0 ? (decoded[0] as number) : null;
};