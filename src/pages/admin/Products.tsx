import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5001/products'

export interface Product {
  _id: string
  productID: string
  productName: string
  altNames: string[]
  images: string[]
  price: number
  lastPrice: number
  stock: number
  descriptio: string
}

async function fetchProducts(): Promise<Product[]> {
  const { data } = await axios.get<Product[]>(API_URL)
  return data as Product[]
}

function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      if (axios.isAxiosError(err))
        setError(err.message ?? 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { products, loading, error, refetch: load }
}

export default function AdminProducts() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white m-0 mb-4">
          Products
        </h2>
        <div className="p-8 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 m-0">Loading products…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white m-0 mb-4">
          Products
        </h2>
        <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 m-0">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white m-0 mb-4">
        Products
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        {products.length} product(s)
      </p>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80">
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Image</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">ID</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Name</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Price</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Was</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300">Stock</th>
              <th className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300 max-w-[200px]">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-neutral-100 dark:border-neutral-700/50 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-700/30"
              >
                <td className="px-4 py-3">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-neutral-600 dark:text-neutral-400">
                  {p.productID}
                </td>
                <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">
                  {p.productName}
                </td>
                <td className="px-4 py-3 text-neutral-900 dark:text-white">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 line-through">
                  ${p.lastPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {p.stock}
                </td>
                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400 max-w-[200px] truncate" title={p.descriptio}>
                  {p.descriptio || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}