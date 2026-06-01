import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase() || 'admin@gmail.com'
const PORT = process.env.PORT || 3001

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.')
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
})

const getBearerToken = (req) => {
  const header = req.headers.authorization || req.headers.Authorization
  if (!header || typeof header !== 'string') return null
  const parts = header.split(' ')
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') return null
  return parts[1]
}

async function verifyAdminSession(req, res, next) {
  const token = getBearerToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' })
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data?.user) {
    return res.status(401).json({ error: 'Token de autenticação inválido.' })
  }

  if (data.user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return res.status(403).json({ error: 'Acesso negado. Usuário não é administrador.' })
  }

  req.adminUser = data.user
  next()
}

app.post('/api/admin/reset-password', verifyAdminSession, async (req, res) => {
  const { userId, password } = req.body

  console.log('[RESET-PASSWORD] Request received:', { userId, adminEmail: req.adminUser?.email })

  if (!userId || typeof userId !== 'string') {
    console.log('[RESET-PASSWORD] Invalid userId:', userId)
    return res.status(400).json({ error: 'userId é obrigatório.' })
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    console.log('[RESET-PASSWORD] Invalid password length')
    return res.status(400).json({ error: 'password é obrigatório e deve ter pelo menos 6 caracteres.' })
  }

  try {
    console.log('[RESET-PASSWORD] Calling Supabase admin.updateUserById...')
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password,
    })

    if (error) {
      console.log('[RESET-PASSWORD] Supabase error:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('[RESET-PASSWORD] Success for user:', userId)
    return res.json({ user: data.user })
  } catch (err) {
    console.log('[RESET-PASSWORD] Catch error:', err)
    return res.status(500).json({ error: err.message })
  }
})

app.get('/api/admin/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Supabase admin API running on http://localhost:${PORT}`)
})
