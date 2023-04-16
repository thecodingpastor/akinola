const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        APP_URL: "http://localhost:4000/api/v1",
        TOKEN_EXPIRES: "2592000000",
        EMAIL_SERVICE_ID: "service_dbr849g",
        EMAIL_TEMPLATE_ID: "template_0rxzfgg",
        EMAIL_USER_ID: "s1kHASytRypomu8RH",
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
    env: {
      APP_URL: "https://wild-erin-bass-shoe.cyclic.app/api/v1",
      TOKEN_EXPIRES: "2592000000",
      EMAIL_SERVICE_ID: "service_dbr849g",
      EMAIL_TEMPLATE_ID: "template_0rxzfgg",
      EMAIL_USER_ID: "s1kHASytRypomu8RH",
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};
