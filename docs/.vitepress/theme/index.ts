import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'virtual:group-icons.css'
import './styles.css'
import { setupAuthGuard } from '../auth'
import Login from './Login.vue'
import SignOut from './SignOut.vue'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('Login', Login)
    ctx.app.component('SignOut', SignOut)
    setupAuthGuard(ctx.router)
  }
}

export default theme
