import { readFileSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

try {
  const env = readFileSync(join(process.cwd(), '.env'), 'utf8');
  env.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        const val = trimmed.slice(eqIndex + 1).trim();
        process.env[key] = val;
      }
    }
  });
} catch {}

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);