function Dashboard({ success, errors }) {
  const total = success.length + errors.length
  const successPercent = total === 0 ? 0 : Math.round((success.length / total) * 100)
  const errorPercent = total === 0 ? 0 : Math.round((errors.length / total) * 100)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-1">
        Resumen
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        {total} registros procesados — {success.length} exitosos, {errors.length} con errores.
      </p>

      <div className="space-y-4">

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-slate-700">Correctos</span>
            </div>
            <span className="text-sm font-medium text-slate-700">
              {successPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${successPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              <span className="text-sm text-slate-700">Con errores</span>
            </div>
            <span className="text-sm font-medium text-slate-700">
              {errorPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="bg-red-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${errorPercent}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard