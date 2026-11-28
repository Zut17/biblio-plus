<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'
import { useReservationsStore } from '@/stores/reservations'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps({ id: String })
const router = useRouter()
const reservations = useReservationsStore()
const { books, loading, load } = useBooks()

const book = computed(() =>
  books.value.find((b) => b.id === Number(props.id)),
)

onMounted(async () => {
  await load()
  if (!book.value) router.replace({ name: 'not-found' })
})

const open = ref(false)
const confirmed = ref(false)
const today = new Date().toISOString().slice(0, 10)

const form = reactive({ name: '', email: '', date: '' })
const touched = reactive({ name: false, email: false, date: false })

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Adresse e-mail invalide.',
  date: !form.date
    ? 'Choisissez une date de retrait.'
    : form.date < today
      ? 'La date ne peut pas être dans le passé.'
      : '',
}))

const isValid = computed(() => Object.values(errors.value).every((e) => !e))

function openModal() {
  form.name = ''
  form.email = ''
  form.date = ''
  Object.keys(touched).forEach((k) => (touched[k] = false))
  confirmed.value = false
  open.value = true
}

function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  if (!isValid.value) return
  reservations.add({
    bookId: book.value.id,
    name: form.name.trim(),
    email: form.email.trim(),
    pickupDate: form.date,
  })
  confirmed.value = true
}
</script>

<template>
  <div class="page">
    <p v-if="loading" role="status">Chargement…</p>

    <article v-else-if="book" class="book-detail">
      <h1>{{ book.title }}</h1>
      <p>{{ book.author }} · {{ book.year }}</p>
      <p>{{ book.summary }}</p>
      <p>{{ book.available ? 'Disponible' : 'Emprunté' }}</p>

      <BaseButton :disabled="!book.available" @click="openModal">
        Réserver
      </BaseButton>
      <p v-if="!book.available" class="book-detail__note">
        Ce livre n'est pas réservable pour le moment.
      </p>

      <p><RouterLink to="/catalogue">← Retour au catalogue</RouterLink></p>

      <BaseModal :open="open" title="Réserver ce livre" @close="open = false">
        <p v-if="confirmed" role="status">
          Merci {{ form.name }}, votre réservation de « {{ book.title }} » est enregistrée.
        </p>

        <form v-else novalidate @submit.prevent="submit">
          <div class="field">
            <label for="res-name">Nom</label>
            <input id="res-name" v-model="form.name" @blur="touched.name = true"
                   :aria-invalid="touched.name && !!errors.name"
                   aria-describedby="res-name-err" />
            <p id="res-name-err" class="field__error"
               v-if="touched.name && errors.name">{{ errors.name }}</p>
          </div>

          <div class="field">
            <label for="res-email">E-mail</label>
            <input id="res-email" type="email" v-model="form.email" @blur="touched.email = true"
                   :aria-invalid="touched.email && !!errors.email"
                   aria-describedby="res-email-err" />
            <p id="res-email-err" class="field__error"
               v-if="touched.email && errors.email">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="res-date">Date de retrait</label>
            <input id="res-date" type="date" :min="today" v-model="form.date" @blur="touched.date = true"
                   :aria-invalid="touched.date && !!errors.date"
                   aria-describedby="res-date-err" />
            <p id="res-date-err" class="field__error"
               v-if="touched.date && errors.date">{{ errors.date }}</p>
          </div>

          <BaseButton type="submit">Confirmer</BaseButton>
        </form>
      </BaseModal>
    </article>
  </div>
</template>

<style scoped>
.book-detail { max-width: 45rem; }
.book-detail__note { color: var(--color-text-muted); }
.field { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
.field input {
  width: 100%;
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  color: var(--color-text);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
}
.field [aria-invalid='true'] { border-color: var(--color-danger); }
.field__error { color: var(--color-danger); margin: 0; }
</style>
