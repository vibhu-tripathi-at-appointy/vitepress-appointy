import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { Router } from 'vitepress'

export function isAllowedEmail(email?: string | null): boolean {
  return !!email && email.endsWith('@appointy.com')
}

export function setupAuthGuard(router: Router) {
  if (typeof window === 'undefined') return
  router.onBeforeRouteChange = async (to) => {
    if (to.startsWith('/login')) return
    const user = auth.currentUser
    if (isAllowedEmail(user?.email)) return
    return new Promise<void | boolean>((resolve) => {
      onAuthStateChanged(auth, (u) => {
        if (isAllowedEmail(u?.email)) {
          resolve()
        } else {
          sessionStorage.setItem('redirect', to)
          window.location.href = '/login'
          resolve(false)
        }
      })
    })
  }
}
