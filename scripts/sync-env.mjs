#!/usr/bin/env node
/**
 * Synchronise .env.local → environment.development.local.ts (gitignored).
 * Les secrets ne doivent jamais être commités dans src/environments/.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFilePath = resolve(projectRoot, '.env.local');
const outputPath = resolve(
  projectRoot,
  'src/environments/environment.development.local.ts',
);

const defaultValues = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
};

function escapeTypeScriptString(value) {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

function parseEnvFile(content) {
  const parsedValues = { ...defaultValues };

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();
    parsedValues[key] = value;
  }

  return parsedValues;
}

const envValues = existsSync(envFilePath)
  ? parseEnvFile(readFileSync(envFilePath, 'utf8'))
  : defaultValues;

if (!existsSync(envFilePath)) {
  console.warn(
    '⚠  .env.local introuvable — placeholders utilisés. Copiez .env.example vers .env.local.',
  );
}

const generatedSource = `// Fichier généré par scripts/sync-env.mjs — NE PAS ÉDITER NI COMMITTER
// Source : .env.local (gitignored)

import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  supabase: {
    url: '${escapeTypeScriptString(envValues.SUPABASE_URL)}',
    anonKey: '${escapeTypeScriptString(envValues.SUPABASE_ANON_KEY)}',
  },
};
`;

writeFileSync(outputPath, generatedSource, 'utf8');
console.log('✓ src/environments/environment.development.local.ts synchronisé depuis .env.local');
