<script setup lang="ts">

const props = defineProps<{
  name: string,
  disabledLabel?: string,
  enabledLabel?: string,
  ariaLabel: string
}>()

</script>

<template>
  <div>
    <input :name="props.name" :id="props.name" class="toggle-checkbox" type="checkbox" />
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
