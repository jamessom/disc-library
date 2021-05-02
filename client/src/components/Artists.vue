<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red-200" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new Artist</h3>

    <form @submit.prevent="addArtist">
      <div class="mb-6">
        <input
          type="text"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type an artist name"
          v-model="newArtist.name"
        />
      </div>

      <input type="submit" value="Add artist" :class="submintButtonClasses" />
    </form>

    <hr />
  </div>
</template>

<script>
export default {
  name: 'Artists',
  data() {
    return {
      submintButtonClasses: [
        'font-sans',
        'font-bold',
        'px-4',
        'rounded',
        'cursor-pointer',
        'no-underline',
        'bg-green-400',
        'hover:bg-green-600',
        'block',
        'w-full',
        'py-4',
        'text-with-200',
        'item-center',
        'justify-center',
      ],
    };
  },
};
</script>
