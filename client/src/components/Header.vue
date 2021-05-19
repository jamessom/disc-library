<template>
  <header class="bg-gray-200 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <RecordVinyl />

        <a href="/" :class="linkClasses.join(' ')">Record Store</a>
      </div>

      <div>
        <router-link
          class="border rounded hover:border-white hover:bg-gray-200 py-1 px-3"
          to="/"
          v-if="!signedIn()"
          >Sign in</router-link
        >
        <router-link
          class="border rounded hover:border-white hover:bg-gray-200 py-1 px-3"
          to="/signup"
          v-if="!signedIn()"
          >Sign UP</router-link
        >
        <router-link
          class="border rounded hover:border-white hover:bg-gray-200 py-1 px-3"
          to="/records"
          v-if="signedIn()"
          >Records</router-link
        >
        <router-link
          class="border rounded hover:border-white hover:bg-gray-200 py-1 px-3"
          to="/artists"
          v-if="signedIn()"
          >Artists</router-link
        >
        <a
          href="#"
          @click.prevent="signOut"
          class="border rounded hover:border-white hover:bg-gray-200 py-1 px-3"
          v-if="signedIn()"
        ></a>
      </div>
    </div>
  </header>
</template>

<script>
import RecordVinyl from '@/components/icons/recordVinyl';

export default {
  name: 'Header',
  data() {
    return {
      linkClasses: [
        'uppercase',
        'text-sm',
        'font-mono',
        'pl-4',
        'font-semibold',
        'no-underline',
        'text-indigo-600',
        'hover:text-indigo-900',
      ],
    };
  },
  components: {
    RecordVinyl,
  },
  created() {
    this.signedIn();
  },
  methods: {
    setError(error, message) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        message;
    },
    signedIn() {
      return localStorage.signedIn;
    },
    signOut() {
      this.$http.secured
        .delete('/signin')
        .then(() => {
          delete localStorage.csrf;
          delete localStorage.signedIn;

          this.$router.replace('/');
        })
        .catch(err => this.setError(err, 'Cannot sign out'));
    },
  },
};
</script>
