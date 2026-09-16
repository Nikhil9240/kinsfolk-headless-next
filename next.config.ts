import type { NextConfig } from "next";

/* =========================================================
   NEXT.JS CONFIGURATION
   ---------------------------------------------------------
   WordPress local server मधून येणाऱ्या featured images
   साठी localhost image hostname allow केला आहे.
========================================================= */

const nextConfig: NextConfig = {
  /* =======================================================
     IMAGE CONFIGURATION
     -------------------------------------------------------
     WordPress:
     http://localhost/headless-wp/wp-content/uploads/...

     Local development मध्ये localhost/private IP images
     वापरण्यासाठी dangerouslyAllowLocalIP enabled.
  ======================================================= */

  images: {
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/headless-wp/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;