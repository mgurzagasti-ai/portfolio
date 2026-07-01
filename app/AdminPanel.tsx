"use client";

import { FormEvent, useEffect, useState } from "react";
import { LoaderCircle, Lock, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import type { Project } from "@/lib/projects";

type AdminPanelProps = {
  projects: Project[];
};

export function AdminPanel({ projects }: AdminPanelProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const savedPassword = window.sessionStorage.getItem("portfolio-admin-password");

    if (savedPassword) {
      setPassword(savedPassword);
      setPasswordInput(savedPassword);
      setIsUnlocked(true);
    }
  }, []);

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsChecking(true);
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: passwordInput }),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(data.message || "No se pudo validar la contrasena.");
      setIsChecking(false);
      return;
    }

    window.sessionStorage.setItem("portfolio-admin-password", passwordInput);
    setPassword(passwordInput);
    setIsUnlocked(true);
    setMessage("Panel habilitado.");
    setIsChecking(false);
  }

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("password", password);

    const response = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(data.message || "No se pudo guardar el trabajo.");
      setIsSaving(false);
      return;
    }

    form.reset();
    setMessage("Trabajo agregado correctamente.");
    setIsSaving(false);
    router.refresh();
  }

  async function handleDeleteProject(id: string) {
    setDeletingId(id);
    setMessage("");

    const response = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    const data = (await response.json()) as { message?: string };

    if (!response.ok) {
      setMessage(data.message || "No se pudo eliminar el trabajo.");
      setDeletingId(null);
      return;
    }

    setMessage("Trabajo eliminado.");
    setDeletingId(null);
    router.refresh();
  }

  function handleLock() {
    window.sessionStorage.removeItem("portfolio-admin-password");
    setPassword("");
    setPasswordInput("");
    setIsUnlocked(false);
    setMessage("");
  }

  return (
    <section className={styles.adminSection} id="admin">
      <div className={styles.sectionHeader}>
        <p>Autogestion</p>
        <h2>Panel admin</h2>
      </div>

      {!isUnlocked ? (
        <form className={styles.adminLogin} onSubmit={handleUnlock}>
          <label className={styles.field}>
            <span>Contrasena admin</span>
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Ingresa tu contrasena"
              required
            />
          </label>
          <button className={styles.primaryButton} type="submit" disabled={isChecking}>
            {isChecking ? <LoaderCircle size={18} className={styles.spin} /> : <Lock size={18} />}
            Entrar
          </button>
        </form>
      ) : (
        <div className={styles.adminShell}>
          <form className={styles.adminForm} onSubmit={handleCreateProject}>
            <div className={styles.adminFormHeader}>
              <h3>Subir nuevo trabajo</h3>
              <button className={styles.secondaryButton} type="button" onClick={handleLock}>
                <Lock size={16} />
                Cerrar panel
              </button>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Titulo</span>
                <input name="title" placeholder="Ej: App de turnos" required />
              </label>
              <label className={styles.field}>
                <span>Tipo</span>
                <input name="type" placeholder="Sitio web / App / Infraestructura" required />
              </label>
              <label className={styles.fieldWide}>
                <span>Descripcion</span>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Conta que resolviste con este trabajo"
                  required
                />
              </label>
              <label className={styles.field}>
                <span>Estado</span>
                <input name="status" placeholder="Publicado / En uso / Proyecto destacado" required />
              </label>
              <label className={styles.field}>
                <span>Stack</span>
                <input name="stack" placeholder="Next.js, React, PostgreSQL" required />
              </label>
              <label className={styles.field}>
                <span>URL web</span>
                <input name="liveUrl" type="url" placeholder="https://..." />
              </label>
              <label className={styles.field}>
                <span>URL codigo</span>
                <input name="repoUrl" type="url" placeholder="https://github.com/..." />
              </label>
              <label className={styles.fieldWide}>
                <span>Imagen</span>
                <input name="image" type="file" accept="image/png,image/jpeg,image/webp" />
              </label>
            </div>

            <button className={styles.primaryButton} type="submit" disabled={isSaving}>
              {isSaving ? <LoaderCircle size={18} className={styles.spin} /> : <Plus size={18} />}
              Guardar trabajo
            </button>
          </form>

          <div className={styles.adminList}>
            <div className={styles.adminFormHeader}>
              <h3>Trabajos cargados</h3>
              <span>{projects.length} publicados</span>
            </div>
            <div className={styles.adminProjectList}>
              {projects.map((project) => (
                <article className={styles.adminProjectItem} key={project.id}>
                  <div>
                    <strong>{project.title}</strong>
                    <p>{project.type}</p>
                  </div>
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? (
                      <LoaderCircle size={16} className={styles.spin} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {message ? <p className={styles.adminMessage}>{message}</p> : null}
    </section>
  );
}
