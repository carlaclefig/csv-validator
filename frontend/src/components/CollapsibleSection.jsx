import { useState } from 'react'

function CollapsibleSection({ title, subtitle, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl border border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6"
      >
        <div className="text-left">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {children}
        </div>
      )}
    </div>
  )
}

export default CollapsibleSection