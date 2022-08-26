import { preload } from "lingo3d"
import IModel from "lingo3d/lib/interface/IModel"
import { onUnmounted, ref } from "vue"

export default (
  urls: Array<string | (Partial<IModel> & { src: string })>,
  total: string | number
) => {
  const progress = ref(0)

  let proceed = true
  preload(urls, total, (val) => proceed && (progress.value = val)).then(
    () => proceed && (progress.value = 100)
  )

  onUnmounted(() => {
    proceed = false
  })
  return progress
}
