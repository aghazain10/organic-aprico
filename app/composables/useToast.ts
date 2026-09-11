const visible = ref(false)
const message = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  function show(text: string, duration = 2200) {
    message.value = text
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { visible.value = false }, duration)
  }

  return { visible, message, show }
}
