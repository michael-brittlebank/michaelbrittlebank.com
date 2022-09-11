import packageJson from '../../../../package.json';
import { SocialMedia } from './social-media';

const SocialSection = (
  <>
    <h4 className="footer-text">Find Me:</h4>
    <SocialMedia />
  </>
);

export function Footer() {
  return (
    <footer className="grid-container row animated fadeInUp">
      <div className="col-sm-12 hide-for-medium-up text-right footer-text-container">
        {SocialSection}
      </div>
      <div className="col-sm-12 col-md-6 footer-text-container">
        <p className="footer-text">
          v{packageJson.version} built with{' '}
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            Next.js
          </a>
          ,{' '}
          <a href="https://nx.dev/" target="_blank" rel="noreferrer">
            Nx
          </a>
          , &amp;{' '}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noreferrer">
            TypeScript
          </a>
        </p>
      </div>
      <div className="col-md-6 hide-for-small text-right footer-text-container">
        {SocialSection}
      </div>
    </footer>
  );
}
