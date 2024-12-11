/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pzijefezqfozyw1n.public.blob.vercel-storage.com',
      'raflink.s3.eu-west-3.amazonaws.com', // Ajout du domaine correct
    ],
  },
};

export default nextConfig;
