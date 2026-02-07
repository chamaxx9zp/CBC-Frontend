export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white m-0 mb-4">
        Dashboard
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Overview of your store.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide m-0 mb-2">
            Overview
          </h3>
          <p className="text-neutral-900 dark:text-white m-0 text-sm">
            Manage your app from here.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide m-0 mb-2">
            Users
          </h3>
          <p className="text-neutral-900 dark:text-white m-0 text-sm">
            View and manage users.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide m-0 mb-2">
            Settings
          </h3>
          <p className="text-neutral-900 dark:text-white m-0 text-sm">
            Configure your settings.
          </p>
        </div>
      </div>
    </div>
  )
}
