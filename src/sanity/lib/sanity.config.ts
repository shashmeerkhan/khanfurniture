import { defineConfig } from 'sanity';
import { projectId } from '../env';
export default defineConfig({
  projectId: projectId,
  dataset: 'production',
  title: 'studio',
  apiVersion: '2025-01-21',
  plugins: [],
});
