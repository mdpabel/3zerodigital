export type DeployConfig = {
  repoUrl: string; // public Git repo (e.g., https://github.com/owner/repo)
  projectName?: string; // optional: initial project name
  repositoryName?: string; // optional: initial repo name when cloning
  rootDirectory?: string; // optional: if the app lives in a subfolder
  env?: string[]; // optional: env var NAMES (Vercel will prompt for values)
  envDescription?: string; // optional help text
  envLink?: string; // optional docs link
  demoTitle?: string; // optional: shows on Vercel clone page
  demoUrl?: string; // optional: shows on Vercel clone page
  demoImage?: string; // optional: shows on Vercel clone page
};

export function buildVercelDeployUrl(c: DeployConfig) {
  const p = new URLSearchParams({
    'repository-url': c.repoUrl,
  });

  if (c.projectName) p.set('project-name', c.projectName);
  if (c.repositoryName) p.set('repository-name', c.repositoryName);
  if (c.rootDirectory) p.set('root-directory', c.rootDirectory);
  if (c.env?.length) p.set('env', c.env.join(','));
  if (c.envDescription) p.set('envDescription', c.envDescription);
  if (c.envLink) p.set('envLink', c.envLink);
  if (c.demoTitle) p.set('demo-title', c.demoTitle);
  if (c.demoUrl) p.set('demo-url', c.demoUrl);
  if (c.demoImage) p.set('demo-image', c.demoImage);

  return `https://vercel.com/new/clone?${p.toString()}`;
}
