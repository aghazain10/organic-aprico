export default defineNitroPlugin(() => {
  if (process.env.ADMIN_PASSWORD && process.env.DATABASE_URL) return
  try {
    process.loadEnvFile()
  } catch {
    /* no .env in cwd — rely on process environment */
  }
})
