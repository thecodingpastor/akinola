const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        APP_URL: "http://localhost:4000/api/v1",
        TOKEN_EXPIRES: "2592000000",
      },
      images: {
        domains: ["res.cloudinary.com"],
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
    };
  }

  return {
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};
