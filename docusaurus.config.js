// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Basepair Docs',
  tagline: 'Discover how to execute pipelines, integrate custom workflows, and access the comprehensive Basepair knowledge hub — all in one platform.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.basepairtech.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'basepair', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  //deploymentBranch: "gh-pages", // Deployment branch for GitHub Pages
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'log',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/basepair.png',
      navbar: {
        logo: {
          alt: 'Basepair',
          src: 'img/basepair.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebarId',
            position: 'left',
            label: 'Docs',
          }],
      },
      footer: {
        style: 'dark',
        links: [
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Basepair Inc`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};

export default config;
