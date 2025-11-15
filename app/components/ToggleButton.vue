<script setup lang="ts">

const props = defineProps<{
  name: string,
  'disabled-label'?: string,
  'enabled-label'?: string,
  'aria-label': string
}>()

</script>

<template>
  <div>
    <input :name="props.name" :id="props.name" class="toggle-checkbox" type="checkbox" />
    <label class="toggle-label" :for="props.name" :aria-label="props['aria-label']">
      <div class="toggle-indicator transitionner flex-center">
        {{ props['disabled-label'] ? props['disabled-label'] : "&lArr;" }}
      </div>
      <div class="toggle-indicator transitionner flex-center">
        {{ props['enabled-label'] ? props['enabled-label'] : "&rArr;" }}
      </div>
    </label>
  </div>
</template>
