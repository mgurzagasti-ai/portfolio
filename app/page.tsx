import {
  ArrowDown,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { AdminPanel } from "./AdminPanel";
import styles from "./page.module.css";
import { getProjects } from "@/lib/projects";

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
    details: "Atencion comercial y seguimiento de clientes.",
  },
];

const courses = ["CCNA", "Java / Next.js", "Bootcamp Java Developer", "Open English (en proceso)"];

const certificates = [
  {
    title: "Next Js",
    issuer: "Coderhouse",
    date: "11 de diciembre de 2023",
    image: "/certificados/nextjs-coderhouse.jpeg",
  },
  {
    title: "Java Standard 11 Web Programming",
    issuer: "EducacionIT",
    date: "28 de febrero de 2023",
    image: "/certificados/java-standard11.jpeg",
  },
  {
    title: "Java Developer",
    issuer: "EducacionIT + Manhattan University",
    date: "24 de noviembre de 2023",
    image: "/certificados/java-developer-bootcamp.jpeg",
  },
  {
    title: "React.JS Developer",
    issuer: "EducacionIT",
    date: "16 de enero de 2024",
    image: "/certificados/reactjs-developer.jpeg",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a className={styles.brand} href="#inicio">
          MU
        </a>
        <nav className={styles.links} aria-label="Navegacion principal">
          <a href="#trabajos">Trabajos</a>
          <a className={styles.linkWithIcon} href="#titulos">
            <GraduationCap size={16} />
            Titulos
          </a>
          <a href="#experiencia">Experiencia</a>
          <a href="#contacto">Contacto</a>
          <a href="#admin">Admin</a>
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
            <a className={styles.secondaryButton} href="#admin">
              <Code2 size={18} />
              Admin
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
          <p>Seleccion</p>
          <h2>Trabajos realizados</h2>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.id}>
              {project.image ? (
                <div className={styles.projectImageWrap}>
                  <img
                    className={styles.projectImage}
                    src={project.image}
                    alt={`Vista previa de ${project.title}`}
                  />
                </div>
              ) : null}
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
            <p>Perfil tecnico</p>
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

      <section className={styles.section} id="titulos">
        <div className={styles.sectionHeader}>
          <p>Credenciales</p>
          <h2>Titulos y certificados</h2>
        </div>
        <div className={styles.certificateGrid}>
          {certificates.map((certificate) => (
            <article className={styles.certificateCard} key={certificate.title}>
              <a
                className={styles.certificateImageLink}
                href={certificate.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir certificado ${certificate.title}`}
              >
                <img src={certificate.image} alt={`Certificado ${certificate.title}`} />
              </a>
              <div className={styles.certificateBody}>
                <p>{certificate.issuer}</p>
                <h3>{certificate.title}</h3>
                <span>{certificate.date}</span>
                <a href={certificate.image} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} />
                  Ver certificado
                </a>
              </div>
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

      <AdminPanel projects={projects} />
    </main>
  );
}
