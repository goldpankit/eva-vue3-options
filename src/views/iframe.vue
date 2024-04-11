<template>
  <iframe :src="$route.query.uri"></iframe>
</template>

<script>

export default {
}
</script>

<style scoped lang="scss">
iframe {
  width: 100%;
  height: 98%;
  border: 0;
}
</style>
