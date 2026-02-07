import { useNavigate, NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white'
    }`

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white m-0">
          Admin
        </h1>
        <nav className="flex items-center gap-1">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClass}>
            Orders
          </NavLink>
          <NavLink to="/admin/customers" className={navLinkClass}>
            Customers
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-600 bg-transparent text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-500 transition-colors"
        >
          Log out
        </button>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
