import { GitHubIcon, LinkedInBadge, MailIcon, PhoneIcon } from '../components/Icons';
import { profile } from '../data/profile';

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner reveal">
        <div className="eyebrow eyebrow--dark">// 05 contact</div>
        <h2 className="contact__title">
          Let's build
          <br />
          something.
        </h2>
        <p className="contact__lead">
          Have a project in mind or just want to talk shop? Email is the fastest way to reach me.
        </p>
        <div className="contact__links">
          <a href={`mailto:${profile.email}`} className="btn btn--dark">
            <MailIcon />
            {profile.email}
          </a>
          <a href={profile.phoneHref} className="btn btn--outline-dark">
            <PhoneIcon />
            {profile.phone}
          </a>
          <a href={profile.github} target="_blank" rel="noopener" className="btn btn--outline-dark">
            <GitHubIcon />
            {profile.githubLabel}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener" className="btn btn--outline-dark">
            <LinkedInBadge />
            {profile.linkedinLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
