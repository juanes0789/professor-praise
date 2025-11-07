import { useState } from "react";
import { GraduationCap, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

/** Modal simple embebido para crear profesores */
function AddProfessorModal({
                             open,
                             onClose,
                             onCreated,
                           }: {
  open: boolean;
  onClose: () => void;
  onCreated?: (prof: any) => void;
}) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setName("");
    setSubject("");
    setFaculty("");
    setUniversity("");
    setErr(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!name.trim()) {
      setErr("El nombre es obligatorio");
      return;
    }
    if (
        name.length > 100 ||
        subject.length > 100 ||
        faculty.length > 100 ||
        university.length > 100
    ) {
      setErr("Cada campo admite máximo 100 caracteres");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("/api/professors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          subject: subject.trim() || undefined,
          faculty: faculty.trim() || undefined,
          university: university.trim() || undefined,
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setErr(data?.error || "No se pudo crear el profesor");
        return;
      }

      onCreated?.(data);
      reset();
      onClose();
    } catch {
      setErr("Error de red o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        {/* Modal */}
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
          <h2 className="text-lg font-semibold mb-3">Agregar profesor</h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Ana Gómez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Materia</label>
              <input
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej: Física II"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Facultad</label>
              <input
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="Ej: Ciencias"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Universidad</label>
              <input
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Ej: U. de Antioquia"
              />
            </div>

            {err && <p className="text-sm text-red-600">{err}</p>}

            <div className="mt-4 flex justify-end gap-2">
              <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const alias = localStorage.getItem("userAlias");
  const [openAdd, setOpenAdd] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userAlias");
    navigate("/login");
  };

  return (
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">RateMyProf</h1>
            </div>

            <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Usuario:{" "}
              <span className="font-medium text-foreground">{alias}</span>
            </span>

              {/* Botón: Agregar profesor */}
              <Button
                  size="sm"
                  className="gap-2 transition-smooth"
                  onClick={() => setOpenAdd(true)}
                  title="Agregar profesor"
              >
                <Plus className="w-4 h-4" />
                Agregar profesor
              </Button>

              <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 transition-smooth"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AddProfessorModal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            onCreated={() => {
              // Si no manejas estado global, recarga para ver el nuevo profesor
              window.location.reload();
            }}
        />
      </nav>
  );
};

export default Navbar;
