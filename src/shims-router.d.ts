import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    readonly title: string
  }
}


