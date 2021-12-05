<template>
  <div class="vuejs-loading vuejs-loading-circular">
    <span class="vuejs-loading-spinner vuejs-loading-spinner-circular">
      <svg class="vuejs-loading-circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    <span class="vuejs-loading-text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'loading'
};
</script>
