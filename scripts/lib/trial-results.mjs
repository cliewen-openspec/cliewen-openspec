// A captured process record preserves provenance around the CLI's JSON output.
export function successfulScopedCheck(record, change) {
  const successful = value => value?.ok === true && Array.isArray(value.findings);
  if (successful(record)) return true;
  if (record?.exitCode !== 0 || !Array.isArray(record.command) || typeof record.stdout !== 'string') return false;
  const index = record.command.indexOf('--change');
  if (!record.command.includes('check') || index < 0 || record.command[index + 1] !== change) return false;
  try { return successful(JSON.parse(record.stdout)); } catch { return false; }
}
