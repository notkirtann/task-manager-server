import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

export { swaggerUi, swaggerDocument };
