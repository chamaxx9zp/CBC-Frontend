import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white m-0">
          Home
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors"
        >
          Log out
        </button>
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <p className="text-lg text-neutral-500 dark:text-neutral-400 m-0">
          Welcome! You're logged in.
        </p>
      </main>
    </div>
  )
}
