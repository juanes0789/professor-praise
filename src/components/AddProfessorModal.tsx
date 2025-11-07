import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreated?: (prof: any) => void;
};

export default function AddProfessorModal({ open, onClose, onCreated }: Props) {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [faculty, setFaculty] = useState("");
    const [university, setUniversity] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    if (!open) return null;

    const reset = () => {
        setName(""); setSubject(""); setFaculty(""); setUniversity(""); setErr(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        if (!name.trim()) { setErr("El nombre es obligatorio"); return; }
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
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* modal */}
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
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border px-4 py-2 hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
