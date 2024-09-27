import {fileURLToPath } from 'url';
import {dirname} from 'path';

export const getDirname = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
};

