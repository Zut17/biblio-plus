<script setup>
import { reactive, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const form = reactive({ name: '', email: '', message: '' })
const touched = reactive({ name: false, email: false, message: false })
const sent = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Adresse e-mail invalide.',
  message: form.message.trim().length < 10 ? '10 caractères minimum.' : '',
}))

const isValid = computed(() => Object.values(errors.value).every(e => !e))

function submit() {
  Object.keys(touched).forEach(k => (touched[k] = true))
  if (!isValid.value) return
  sent.value = true
}
</script>

<template>
  <div class="page">
    <h1>Contact</h1>
    <p v-if="sent" role="status">Merci, votre message a bien été envoyé.</p>

    <form v-else class="contact-form" novalidate @submit.prevent="submit">
      <div class="field">
        <label for="name">Nom</label>
        <input id="name" v-model="form.name" @blur="touched.name = true"
               :aria-invalid="touched.name && !!errors.name"
               aria-describedby="name-err" />
        <p id="name-err" class="field__error"
           v-if="touched.name && errors.name">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="form.email" @blur="touched.email = true"
               :aria-invalid="touched.email && !!errors.email"
               aria-describedby="email-err" />
        <p id="email-err" class="field__error"
           v-if="touched.email && errors.email">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model="form.message" @blur="touched.message = true"
                  :aria-invalid="touched.message && !!errors.message"
                  aria-describedby="message-err"></textarea>
        <p id="message-err" class="field__error"
           v-if="touched.message && errors.message">{{ errors.message }}</p>
      </div>

      <BaseButton type="submit">Envoyer</BaseButton>
    </form>
  </div>
</template>

<style scoped>
.contact-form { max-width: 36rem; }
.field { margin-bottom: 1rem; display: flex; flex-direction: column; gap: .25rem; }
.field input,
.field textarea {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  color: var(--color-text);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
}
.field textarea { resize: vertical; }
.field [aria-invalid="true"] { border-color: var(--color-danger); }
.field__error { color: var(--color-danger); margin: 0; }
</style>
