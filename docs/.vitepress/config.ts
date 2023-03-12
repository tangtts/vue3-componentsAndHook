export default {
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    siteTitle: false,

    logo: "/logo.png",
    nav: [
      { text: "组件", link: "/examples/button/" },
      { text: "hook", link: "/hook/useStorage/" },
      { text: "directive", link: "/directive/clickOutside/" },
      { text: "有趣样式", link: "/css/addKettleDynamically/" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/tangtts/vue3-componentsAndHook.git",
      },
    ],
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
      "/directive/": [
        {
          text: "指令",
          items: [
            {
              text: "clickoutside",
              link: "/directive/clickOutside/",
            },
          ],
        },
      ],
      "/examples/": [
        {
          text: "基础组件",
          items: [
            {
              text: "虚拟列表",
              link: "/examples/virtual/",
            },
            {
              text: "放大镜",
              link: "/examples/magnifiers/",
            },
            {
              text: "无限滚动",
              link: "/examples/infiniteScroll/",
            },
            {
              text: "旋转卡片",
              link: "/examples/reverse-card/",
            },
            {
              text: "上传文件",
              link: "/examples/upload/",
            },
            {
              text: "八卦loading",
              link: "/examples/loading/",
            },
            {
              text: "剪裁图片",
              link: "/examples/jianCai/",
            },
            {
              text: "Tree",
              link: "/examples/tree/",
            },
            {
              text: "Date-Picker",
              link: "/examples/DatePicker/",
            },
            {
              text: "flip",
              link: "/examples/flip/",
            },
          ],
        },
      ],
      "/css/": [
        {
          text: "样式",
          items: [
            {
              text: "喝水目标",
              link: "/css/AddKettleDynamically/",
            },
            {
              text: "图片预览",
              link: "/css/sidePicPreview/",
            },
          ],
        },
      ],
    },
  },
};
