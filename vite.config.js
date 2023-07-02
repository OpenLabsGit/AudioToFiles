import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const mode = process.env.MODE || 'development';
const env = loadEnv(mode, process.cwd());

export default defineConfig({
  define: {
    'process.env': env,
  },
  plugins: [react()],
});
