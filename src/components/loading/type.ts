import type {Ref} from "vue"
type MaybeRef<T> = T | Ref<T> 

export type LoadingOptionsResolved = {
  parent: HTMLElement
  visible: boolean
  target: HTMLElement
  closed?: () => void
}

export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    target: HTMLElement | string
  }
>

export type LoadingBinding = boolean