/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Define the protocol
          hostname: 'lh3.googleusercontent.com', // Define the hostname
          pathname: '/**', // Define the path (wildcard to allow any image from the domain)
        },
      ],
    },
  };
  
  export default nextConfig;
  