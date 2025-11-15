<script setup lang="ts">

const props = defineProps<{
  name: string,
  disabledLabel?: string,
  enabledLabel?: string,
  ariaLabel: string,
  // If false, default state with "disabledLabel" shown
  value?: boolean
}>()

// For what I need now I just define a dumb "change" event.
const emit = defineEmits<{
  (e: "change", state: boolean): void
}>()

// Unearthing the correct TypeScript event type is one of my 
// favorite things to do with the little time the universe 
// gave me.
const handleChange = (e: any) => {
  emit("change", e.target !== undefined ? e.target.checked : false)
}

</script>

<template>
  <div>
    <input @change="handleChange" :checked="props.value !== undefined ? false : props.value" :name="props.name"
      :id="props.name" class="toggle-checkbox" type="checkbox" />
    <label class="toggle-label" :for="props.name" :aria-label="props.ariaLabel">
      <div class="toggle-indicator flex-center">
        {{ props.disabledLabel ? props.disabledLabel : "&lArr;" }}
      </div>
      <div class="toggle-indicator flex-center">
        {{ props.enabledLabel ? props.enabledLabel : "&rArr;" }}
      </div>
    </label>
  </div>
</template>
