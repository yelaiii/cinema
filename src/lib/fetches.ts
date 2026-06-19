import fetches from '@siberiacancode/fetches'

export const instance = fetches.create({
  baseURL: typeof window === 'undefined' ? `${process.env.APP_URL}/api` : '/api',
})

instance.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') return config
  try {
    const cookieStore = await import('next/headers').then(({ cookies }) => cookies())

    config.headers!.cookie = cookieStore
      .getAll()
      .map((cookie) => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
      .join('; ')
  } catch {
    // Ignore error when cookies are not available (e.g. during build-time generateStaticParams)
  }

  return config
})
