import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const LOGIN_API_URL = 'http://localhost:5001/users/login'

type LoginResponse = {
  message: string
  token?: string
  email?: string
  firstName?: string
  lastName?: string
  type?: string
  profilePic?: string
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.post<LoginResponse>(LOGIN_API_URL, {
        email,
        password,
      })

      // Backend always returns 200; use message/token to determine success
      if (data.message !== 'User logged In' || !data.token) {
        setError(data.message || 'Login failed. Please try again.')
        return
      }

      // Optional: store token for later authenticated requests
      localStorage.setItem('authToken', data.token)

      const userType = data.type?.toLowerCase() ?? ''

      if (userType === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/home')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string })?.message ||
          err.message ||
          'Login failed. Please try again.'
        setError(message)
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <div className="w-full max-w-[380px] p-8 rounded-xl bg-white dark:bg-neutral-800 shadow-lg">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white m-0 mb-1">
          Sign in
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-[0.95rem] mb-6">
          Enter your email and password
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="px-3.5 py-2.5 text-base border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
          <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="px-3.5 py-2.5 text-base border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-4 py-3 text-base font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
