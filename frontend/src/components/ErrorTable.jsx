import { useState } from 'react'

function ErrorTable({ errors, onErrorsUpdate }) {
  const PAGE_SIZE = 10
  const [page, setPage] = useState(0)
  const [editedErrors, setEditedErrors] = useState(errors)

  const totalPages = Math.ceil(editedErrors.length / PAGE_SIZE)
  const currentErrors = editedErrors.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const handleChange = (rowIndex, field, value) => {
    const globalIndex = page * PAGE_SIZE + rowIndex
    const updated = [...editedErrors]
    updated[globalIndex] = {
      ...updated[globalIndex],
      data: { ...updated[globalIndex].data, [field]: value },
    }

    const details = { ...updated[globalIndex].details }

    if (field === 'name') {
      if (!value.trim()) {
        details.name = "El campo 'name' no puede estar vacío"
      } else {
        delete details.name
      }
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        details.email = "El campo 'email' no puede estar vacío"
      } else if (!emailRegex.test(value.trim())) {
        details.email = "El formato del campo 'email' es inválido"
      } else {
        delete details.email
      }
    }

    if (field === 'age') {
      if (value !== '') {
        const age = Number(value)
        if (isNaN(age) || !Number.isInteger(age) || age <= 0 || age >= 99) {
          details.age = "El campo 'age' debe ser un número entero entre 1 y 98"
        } else {
          delete details.age
        }
      } else {
        delete details.age
      }
    }

    updated[globalIndex].details = details
    setEditedErrors(updated)
    onErrorsUpdate(updated)
  }

  const handleRetry = () => {
    const pageErrors = editedErrors.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    const valid = pageErrors.filter(e => Object.keys(e.details).length === 0)
    console.log('Reenviar:', valid)
  }

  return (
    <div className="space-y-3">

      <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-3 pb-1 border-b border-slate-100">
        <div className="col-span-1 text-xs font-semibold text-slate-400 uppercase">
          Row
        </div>
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

      {currentErrors.map((error, rowIndex) => (
        <div key={error.row} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">

          <div className="sm:col-span-1 flex items-start pt-1">
            <span className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-md">
              {error.row}
            </span>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 sm:hidden">
              Name
            </label>
            <input
              type="text"
              value={error.data.name}
              onChange={(e) => handleChange(rowIndex, 'name', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.details.name ? 'border-red-400 bg-red-50' : 'border-slate-200'
              }`}
            />
            {error.details.name && (
              <p className="text-red-500 text-xs mt-1">{error.details.name}</p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 sm:hidden">
              Email
            </label>
            <input
              type="text"
              value={error.data.email}
              onChange={(e) => handleChange(rowIndex, 'email', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.details.email ? 'border-red-400 bg-red-50' : 'border-slate-200'
              }`}
            />
            {error.details.email && (
              <p className="text-red-500 text-xs mt-1">{error.details.email}</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1 sm:hidden">
              Age
            </label>
            <input
              type="text"
              value={error.data.age}
              onChange={(e) => handleChange(rowIndex, 'age', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.details.age ? 'border-red-400 bg-red-50' : 'border-slate-200'
              }`}
            />
            {error.details.age && (
              <p className="text-red-500 text-xs mt-1">{error.details.age}</p>
            )}
          </div>

        </div>
      ))}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
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

        <button
          onClick={handleRetry}
          className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          Reenviar
        </button>
      </div>
    </div>
  )
}

export default ErrorTable