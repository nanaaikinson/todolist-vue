<template>
  <router-view :key="$route.fullPath" />
</template>

<style>
body {
  @apply bg-gray-50;
}
</style>
