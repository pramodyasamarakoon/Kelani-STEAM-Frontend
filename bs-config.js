module.exports = {
    server: true,
    watch: true,
    files: ["src/**/*.jsx", "public/*.html"],
    startPath: "",
    open: false,
    port: 3000,
    middleware: [
      {
        route: "/static",
        handle: (req, res, next) => {
          req.url = req.url.replace(/^\/static/, "");
          return next();
        },
      },
    ],
  };
  