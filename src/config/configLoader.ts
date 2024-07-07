import { load } from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';

const fileName = 'config.dev.yaml';

export function loadConfig() {
  return load(readFileSync(join(__dirname, fileName), 'utf8')) as Record<
    string,
    any
  >;
}
