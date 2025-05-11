import { defineConfig } from 'orval';

export default defineConfig({
  realWorldArticles: {
    output: {
      mode: 'tags-split',
      target: 'src/app/data-access/endpoints/real-world-article.ts',
      schemas: 'src/app/data-access/model',
      client: 'angular',
      prettier: true,
      tsconfig: './tsconfig.app.json',
    },
    input: {
      target: './open-api.specs.yml',
    },
  },
});