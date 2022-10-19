export default {
  themeConfig: {
    siteTitle: false,
    logo: "/logo.png",
    nav: [
      { text: "组件", link: "/examples/button/" },
      { text: "hook", link: "/hook/useStorage/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/tangtts/vue3-componentsAndHook.git" }],
    sidebar: {
      "/hook/": [
        {
          text: "hook",
          items: [
            {
              text: "useStorage",
              link: "/hook/useStorage/",
            },
          ],
        },
      ],
      "/examples/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button按钮",
              link: "/examples/button/",
            },
            {
              text: "虚拟列表",
              link: "/examples/virtual/",
            },
            {
              text: "八卦loading",
              link: "/examples/baGua/",
            },
            {
              text: "旋转大图",
              link: "/examples/preview-img/",
            },
            {
              text: "放大镜",
              link: "/examples/magnifiers/",
            },
            {
              text: "无限滚动",
              link: "/examples/infiniteScroll/",
            },
          ],
        },
      ],
    },
  },
};
