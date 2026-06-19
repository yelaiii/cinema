import { apicraft } from '@siberiacancode/apicraft'

export default apicraft([
  {
    input: 'http://localhost:3001/api/rest.json',
    output: 'generated/api',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/lib/fetches',
    },
    nameBy: 'path',
    groupBy: 'tags',
    baseUrl: '/api',
  },
])
