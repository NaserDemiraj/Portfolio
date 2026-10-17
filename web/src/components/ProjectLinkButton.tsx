import type { ProjectLink } from '../data/projects';
import { ExternalIcon, GitHubIcon } from './Icons';

export function ProjectLinkButton({ link }: { link: ProjectLink }) {
  return (
    <a href={link.href} target="_blank" rel="noopener" className="link-btn">
      {link.kind === 'code' ? <GitHubIcon /> : <ExternalIcon />}
      {link.label}
    </a>
  );
}
