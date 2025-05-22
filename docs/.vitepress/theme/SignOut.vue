<template>
  <button @click="logout">Sign out</button>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vitepress'

const router = useRouter()
async function logout() {
  await signOut(auth)
  router.go('/login')
}
</script>
