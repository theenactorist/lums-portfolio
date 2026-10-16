"use client";

import resume from '../data/resume.json';
import homeStyles from '../home.module.css';
import styles from './resume.module.css';

export default function Resume() {
  return (
    <main className={`${homeStyles.homePage} theme2-home ${styles.page}`}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Experience and background</p>
          <h1>Résumé</h1>
          <p className={styles.subtitle}>Product design, systems and AI. From understanding the problem to shipping the work.</p>
        </div>
        <div className={styles.actions}>
          <a className={styles.download} href="/olumide-olusesi-resume.pdf" download>Download PDF <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <article className={styles.paper} aria-label="Olumide Olusesi's résumé">
        <header className={styles.identity}>
          <div><h2>{resume.name}</h2><p className={styles.title}>{resume.title}</p></div>
          <address>
            <span>{resume.location}</span>
            <a href="tel:+16476577810">{resume.phone}</a>
            <a href={`mailto:${resume.email}`}>{resume.email}</a>
            <a href={`https://${resume.linkedin}`}>{resume.linkedin}</a>
            <a href={`https://${resume.website}`}>{resume.website}</a>
          </address>
        </header>
        <section className={styles.section}><h3>Professional summary</h3><p>{resume.summary}</p></section>
        <section className={styles.section}><h3>Core skills</h3><dl className={styles.skills}>{resume.skills.map(s=><div key={s.label}><dt>{s.label}</dt><dd>{s.text}</dd></div>)}</dl></section>
        <section className={styles.section}><h3>Work experience</h3>{resume.experience.map(job=><section className={styles.job} key={job.company}>
          <div className={styles.jobHeading}><div><h4><a href={job.url}>{job.company}</a></h4><p className={styles.role}>{job.role}</p></div><p className={styles.period}>{job.period}</p></div>
          <p>{job.summary}</p><ul>{job.bullets.map(text=><li key={text}>{text}</li>)}</ul>
        </section>)}</section>
        <section className={styles.section}><h3>Selected project</h3>{resume.projects.map(project=><section className={styles.job} key={project.company}><div className={styles.jobHeading}><div><h4><a href={project.url}>{project.company}</a></h4><p className={styles.role}>{project.role}</p></div><p className={styles.period}>{project.period}</p></div><p>{project.text}</p></section>)}</section>
        {[['Education',resume.education],['Certification',resume.certifications],['Volunteer experience',resume.volunteering]].map(([label,items])=><section className={styles.section} key={label}><h3>{label}</h3>{items.map(item=><div className={styles.credential} key={item.title}><div><h4>{item.title}</h4><p>{item.institution}</p>{item.text&&<p>{item.text}</p>}</div><p className={styles.period}>{item.period}</p></div>)}</section>)}
      </article>
    </main>
  );
}
