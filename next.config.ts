import type { NextConfig } from 'next'

const repoName = "interactive-cv-firebase";

const nextConfig: NextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: 'build', // Changes the build output directory to `build`
  
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  compiler: {
    styledComponents: true,
  }
}

export default nextConfig;