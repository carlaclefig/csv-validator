import { useState } from 'react'

function SuccessTable({ success }) {
  const PAGE_SIZE = 10
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(success.length / PAGE_SIZE)
  const currentSuccess = success.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div className="space-y-3">

      <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-3 pb-1 border-b border-slate-100">
        
        <div className="col-span-4 text-xs font-semibold text-slate-400 uppercase">
          Name
        </div>
        <div className="col-span-4 text-xs font-semibold text-slate-400 uppercase">
          Email
        </div>
        <div className="col-span-3 text-xs font-semibold text-slate-400 uppercase">
          Age
        </div>
      </div>

      {currentSuccess.map((user) => (
        <div key={user.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">

          <div className="sm:col-span-4 flex items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-0.5 sm:hidden">
                Name
              </label>
              <span className="text-sm text-slate-800">{user.name}</span>
            </div>
          </div>

          <div className="sm:col-span-4 flex items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-0.5 sm:hidden">
                Email
              </label>
              <span className="text-sm text-slate-600">{user.email}</span>
            </div>
          </div>

          <div className="sm:col-span-3 flex items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-0.5 sm:hidden">
                Age
              </label>
              <span className="text-sm text-slate-600">
                {user.age ?? '—'}
              </span>
            </div>
          </div>

        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-sm text-slate-500">
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages - 1}
            className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}

    </div>
  )
}

export default SuccessTable