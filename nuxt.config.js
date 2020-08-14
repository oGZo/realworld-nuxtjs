/**
 * Nuxt.js 配置文件
 */

module.exports = {
  mode: "spa",
  build: {
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
    publicPath: "//ogzo.gitee.io/realworld-nuxtjs/",
  },
  router: {
    linkActiveClass: "active",
    mode: "hash",
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      let index = null;
      routes.forEach((v, i) => {
        if (v.path == "/home") {
          index = i;
        }
      });
      // 清除 Nuxt.js 基于 pages 目录默认生成的home路由
      if (index != null) {
        routes.splice(index, 1);
      }
      // 生成首页路由
      routes.push({
        path: "/",
        name: "home",
        component: resolve(__dirname, "pages/home/"),
      });
    },
  },

  server: {
    host: "0.0.0.0",
    port: 4000,
  },

  // 注册插件
  plugins: [
    "~/plugins/request.js",
    "~/plugins/dayjs.js",
    "~/plugins/element-ui.js",
  ],
};
