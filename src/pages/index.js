import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { useHistory } from '@docusaurus/router';
import { useEffect, useState } from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            Knowledge base
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem('alreadyVisited');

    if (!alreadyVisited) {
      sessionStorage.setItem('alreadyVisited', 'true');
      history.replace('/intro');
    } else {
      setShouldRenderContent(true); // Show homepage on repeat visits
    }
  }, []);

  if (!shouldRenderContent) {
    return null; // Prevent flicker before redirect or render
  }

  return (
    <Layout
      title={`Basepair ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
