export const version = '0.1.0';
export const requirements = {node: '20.19.0', openspec: '1.15.0'} as const;
export const supportedInstallations = [...new Set(['0.1.0', version])];

export function stableVersion(value: string): number[] | undefined {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.exec(value);
  if (!match) return;
  const parts = match.slice(1, 4).map(Number);
  if (parts.every(Number.isSafeInteger)) return parts;
}

export function meetsMinimum(value: string, minimum: string): boolean {
  const actual = stableVersion(value), floor = stableVersion(minimum);
  if (!actual || !floor) return false;
  for (let i = 0; i < 3; i++) if (actual[i] !== floor[i]) return actual[i] > floor[i];
  return true;
}

export function supportsInstallation(value: unknown): value is string {
  return typeof value === 'string' && !!stableVersion(value) && supportedInstallations.includes(value) && meetsMinimum(version, value);
}
