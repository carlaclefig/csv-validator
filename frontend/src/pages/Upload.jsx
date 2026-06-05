import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCSV } from "../services/api";
import Dashboard from "../components/Dashboard";
import ErrorTable from "../components/ErrorTable";
import CollapsibleSection from "../components/CollapsibleSection";

function Upload({ onLogout }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const data = await uploadCSV(file);
      setResult(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al procesar el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold text-slate-800">
            Sistema de Carga de Datos
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
              Admin
            </span>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm text-slate-500 font-bold hover:text-slate-800 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">
            Cargar archivo CSV
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Columnas esperadas: name, email, age.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto"
            >
              {loading ? "Procesando..." : "Upload File"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>

        {result && (
          <Dashboard success={result.success} errors={result.errors} />
        )}

        {result && result.errors.length > 0 && (
          <CollapsibleSection
            title={`Corrige los registros con errores (${result.errors.length})`}
            subtitle="Edita los campos y reenvía cada página de registros."
            defaultOpen={true}
          >
            <ErrorTable
              errors={result.errors}
              onErrorsUpdate={(updatedErrors, newSuccess = []) =>
                setResult((prev) => ({
                  ...prev,
                  errors: updatedErrors,
                  success: [...prev.success, ...newSuccess],
                }))
              }
            />
          </CollapsibleSection>
        )}
      </main>
    </div>
  );
}

export default Upload;
