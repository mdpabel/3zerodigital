export type DeployConfig = {
  repoUrl: string; // public Git repo (e.g., https://github.com/owner/repo)
  projectName?: string; // optional: initial project name
  repositoryName?: string; // optional: initial repo name when cloning
  rootDirectory?: string; // optional: if the app lives in a subfolder
  env?: string[]; // env variables as key-value pairs
  envDescription?: string; // optional help text for environment variables
  envLink?: string; // optional docs link for environment variables
  demoTitle?: string; // optional: shows on Vercel clone page
  demoDescription?: string; // optional: description for the demo
  demoUrl?: string; // optional: URL for the demo
  demoImage?: string; // optional: image for the demo
};

export function buildVercelDeployUrl(c: DeployConfig) {
  const p = new URLSearchParams({
    'repository-url': c.repoUrl,
  });

  // Add optional parameters to the URL
  if (c.projectName) p.set('project-name', c.projectName);
  if (c.repositoryName) p.set('repository-name', c.repositoryName);
  if (c.rootDirectory) p.set('root-directory', c.rootDirectory);

  // Handle env as a Record<string, string> (append each env var as a separate key)
  if (c.env && Object.keys(c.env).length > 0) {
    Object.keys(c.env).forEach((key) => {
      p.append('env', `${key}=${c.env[key]}`); // append each env variable with its key-value pair
    });
  }

  if (c.envDescription) p.set('envDescription', c.envDescription);
  if (c.envLink) p.set('envLink', c.envLink);
  if (c.demoTitle) p.set('demo-title', c.demoTitle);
  if (c.demoDescription) p.set('demo-description', c.demoDescription); // Added demoDescription
  if (c.demoUrl) p.set('demo-url', c.demoUrl);
  if (c.demoImage) p.set('demo-image', c.demoImage);

  return `https://vercel.com/new/clone?${p.toString()}`;
}
