<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({ open: Boolean, title: String })
const emit = defineEmits(['close'])
const dialog = ref(null)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      dialog.value?.focus()
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="modal"
        @click.self="emit('close')"
        @keydown.esc="emit('close')"
      >
        <div
          ref="dialog"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <h2 id="modal-title">{{ title }}</h2>
          <slot />
          <button type="button" class="modal__close" @click="emit('close')">
            Fermer
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.modal__dialog {
  width: 90%;
  max-width: 28rem;
  max-height: 90vh;
  overflow: auto;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
}
.modal__close {
  min-height: 44px;
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-4);
  color: var(--color-text);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
}
</style>
