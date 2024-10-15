import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  types: [
    {
      type: 'success',
      background: '#9B9EFF21',
      icon: {
        tagName: 'i',
        color: '#fff',
      },
    },
    {
      type: 'error',
      background: '#9B9EFF21',
      icon: {
        tagName: 'i',
        color: '#fff',
      },
    },
  ],
})

interface NotifyParams {
  type?: 'success' | 'error'
  title: string
  subtitle?: string
}

export function notify({
  type = 'success',
  title,
  subtitle = '',
  duration = 2000,
}: NotifyParams) {
  const message = `<div class="notification-header">${title}</div><div class="notification-content">${subtitle}</div>`
  notyf.open({
    type,
    message,
    duration,
  })
}
