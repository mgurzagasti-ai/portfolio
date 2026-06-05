import {
  ArrowDown,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Link,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

const profile = {
  name: "Martin Gabriel Urzagasti",
  role: "Analista de Sistemas | Redes | Soporte IT",
  location: "Rio Blanco, Jujuy",
  email: "martin_urza@hotmail.com",
  phone: "03884082963",
  linkedin: "https://www.linkedin.com/in/martin-urzagasti-624711248",
  github: "",
  summary:
    "Trabajo en redes, administracion de sistemas y soporte tecnico, con experiencia practica resolviendo incidentes, manteniendo conectividad y mejorando procesos internos. Tambien desarrollo soluciones web con Next.js para llevar esa experiencia operativa a herramientas utiles.",
};

const projects = [
  {
    title: "Sistema de Recursos Humanos",
    type: "Aplicación web",
    description:
      "Herramienta interna para gestionar operaciones de RRHH, seguimiento de partes medicos, licencias, usuarios y dispositivos.",
    stack: ["Next.js", "React", "TypeScript", "SQLite"],
    status: "Proyecto destacado",
  },
  {
    title: "Moto Club Jujuy",
    type: "Sitio web",
    description:
      "Creacion de pagina web moderna para Moto Club Jujuy, con presencia publica online y despliegue en Vercel.",
    stack: ["Next.js", "React", "Vercel"],
    status: "Web publicada",
    liveUrl: "https://motoclubjujuy.vercel.app",
    repoUrl: "https://github.com/mgurzagasti-ai/motoclubjujuy",
  },
  {
    title: "Viaje GPS",
    type: "Aplicación web",
    description:
      "Proyecto web para trabajar con viajes y ubicacion GPS, publicado online con despliegue en Vercel.",
    stack: ["Next.js", "React", "GPS", "Vercel"],
    status: "Web publicada",
    liveUrl: "https://viaje-gps.vercel.app",
    repoUrl: "https://github.com/mgurzagasti-ai/viaje-gps",
  },
  {
    title: "Administracion de redes",
    type: "Infraestructura",
    description:
      "Configuracion, mantenimiento y soporte de conectividad para usuarios y sectores de trabajo.",
    stack: ["Redes", "Conectividad", "Soporte"],
    status: "Experiencia laboral",
  },
  {
    title: "Soporte tecnico operativo",
    type: "Servicio IT",
    description:
      "Atencion al usuario, resolucion de incidentes, mantenimiento de equipos y acompanamiento tecnico.",
    stack: ["Sistemas", "Hardware", "Usuarios"],
    status: "Trabajo diario",
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "SQLite",
  "Git",
  "Redes",
  "Soporte IT",
  "Administracion de sistemas",
  "Resolucion de incidentes",
];

const experience = [
  {
    title: "Santa Ana SRL",
    period: "Encargado de Redes y Sistemas",
    details:
      "Responsable de redes y conectividad, administracion de sistemas y soporte tecnico.",
  },
  {
    title: "Gbplex",
    period: "Servicio tecnico y sistemas de farmacias",
    details:
      "Soporte tecnico, mantenimiento y asistencia sobre sistemas utilizados en farmacias.",
  },
  {
    title: "Tecno Accion",
    period: "Servicio tecnico",
    details:
      "Atencion tecnica, diagnostico y resolucion de problemas de equipos y sistemas.",
  },
  {
    title: "Red Megatone",
    period: "Cajero / Creditos / Stock",
    details:
      "Gestion operativa, control de stock, atencion administrativa y manejo de procesos comerciales.",
  },
  {
    title: "Siembra AFJP",
    period: "Ventas",
    details:
      "Atencion comercial y seguimiento de clientes.",
  },
];

const courses = ["CCNA", "Java / Next.js", "Bootcamp Java Developer", "Open English (en proceso)"];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.brand} href="#inicio">
          MU
        </a>
        <nav className={styles.links} aria-label="Navegación principal">
          <a href="#trabajos">Trabajos</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <section className={styles.hero} id="inicio">
        <div className={styles.heroContent}>
          <p className={styles.kicker}>
            <Sparkles size={16} />
            Portfolio profesional
          </p>
          <h1>{profile.name}</h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.summary}>{profile.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#trabajos">
              <BriefcaseBusiness size={18} />
              Ver trabajos
            </a>
            <a className={styles.secondaryButton} href="/Martin_curriculum.pdf">
              <Download size={18} />
              CV
            </a>
          </div>
        </div>
        <figure className={styles.profilePhoto}>
          <img src="/cv-preview.png" alt="Foto de Martin Gabriel Urzagasti" />
        </figure>
        <a className={styles.scrollCue} href="#trabajos" aria-label="Ir a trabajos">
          <ArrowDown size={20} />
        </a>
      </section>

      <section className={styles.section} id="trabajos">
        <div className={styles.sectionHeader}>
          <p>Selección</p>
          <h2>Trabajos realizados</h2>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.title}>
              <div>
                <p className={styles.projectType}>{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className={styles.projectFooter}>
                <span>{project.status}</span>
                {("liveUrl" in project || "repoUrl" in project) && (
                  <div className={styles.projectLinks}>
                    {"liveUrl" in project && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} />
                        Web
                      </a>
                    )}
                    {"repoUrl" in project && (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        <Code2 size={15} />
                        Codigo
                      </a>
                    )}
                  </div>
                )}
                <div className={styles.stack}>
                  {project.stack.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.sectionHeader}>
            <p>Perfil técnico</p>
            <h2>Herramientas que uso</h2>
          </div>
          <div className={styles.skills}>
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>Formacion</p>
          <h2>Cursos</h2>
        </div>
        <div className={styles.courseGrid}>
          {courses.map((course) => (
            <article className={styles.courseItem} key={course}>
              <Code2 size={20} />
              <h3>{course}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="experiencia">
        <div className={styles.sectionHeader}>
          <p>Curriculum</p>
          <h2>Experiencia</h2>
        </div>
        <div className={styles.timeline}>
          {experience.map((item) => (
            <article className={styles.timelineItem} key={item.title}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contacto">
        <div>
          <p className={styles.kicker}>
            <Code2 size={16} />
            Hablemos
          </p>
          <h2>Contacto</h2>
          <p>
            Disponible para proyectos web, soporte tecnico, administracion de
            sistemas y mejoras de procesos internos.
          </p>
        </div>
        <div className={styles.contactList}>
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
          {profile.phone && (
            <a href={`tel:${profile.phone}`}>
              <Phone size={18} />
              {profile.phone}
            </a>
          )}
          <span>
            <MapPin size={18} />
            {profile.location}
          </span>
          <a href={profile.linkedin || "#"} aria-disabled={!profile.linkedin}>
            <Link size={18} />
            LinkedIn
            <ExternalLink size={14} />
          </a>
          <a href={profile.github || "#"} aria-disabled={!profile.github}>
            <Link size={18} />
            GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </main>
  );
}
