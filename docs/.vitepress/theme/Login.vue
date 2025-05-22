<template>
  <div class="login">
    <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <input v-model="email" type="email" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vitepress'
import { isAllowedEmail } from '../auth'

const email = ref('')
const password = ref('')
const router = useRouter()

async function signIn() {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    if (!isAllowedEmail(cred.user.email)) {
      await auth.signOut()
      alert('Only appointy.com emails are allowed.')
      return
    }
    const redirect = sessionStorage.getItem('redirect') || '/' 
    sessionStorage.removeItem('redirect')
    router.go(redirect)
  } catch (e) {
    alert('Authentication failed')
  }
}
</script>

<style scoped>
.login { padding: 2rem; }
.login input { display: block; margin: 0.5rem 0; }
</style>
