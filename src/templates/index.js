import path, {dirname} from "path";
import { fileURLToPath } from 'url';

// __filename and __dirname polyfills
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  "1dan": path.resolve(__dirname, `template - 1dan.docx`),
  "1kup": path.resolve(__dirname, `template - 1kup.docx`),
  "2kup": path.resolve(__dirname, `template - 2kup.docx`),
  "3kup": path.resolve(__dirname, `template - 3kup.docx`),
  "4kup": path.resolve(__dirname, `template - 4kup.docx`),
  "5kup": path.resolve(__dirname, `template - 5kup.docx`),
  "6kup": path.resolve(__dirname, `template - 6kup.docx`),
  "7kup": path.resolve(__dirname, `template - 7kup.docx`),
  "8kup": path.resolve(__dirname, `template - 8kup.docx`),
  "9kup": path.resolve(__dirname, `template - 9kup.docx`),
};