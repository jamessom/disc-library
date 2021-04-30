<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-gray-200 shadow rounded">
      <h3 class="text-2xl mb-6 text-gray-600">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="erro">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Adress</label>
          <input
            type="email"
            id="email"
            class="input"
            v-model="email"
            placeholder="email@email.com"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            id="password"
            class="input"
            v-model="password"
            placeholder="email@email.com"
          />
        </div>

        <button :class="this.buttonClasses.join(' ')">Sign In</button>

        <div class="my-4">
          <router-link class="link" to="/signup">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      buttonClasses: [
        'font-sans',
        'font-bold',
        'px-4',
        'rounded',
        'cursor-point',
        'no-underline',
        'bg-green-400',
        'hover:bg-green-600',
        'block',
        'w-full',
        'py-4',
        'text-white',
        'items-center',
        'justify-center',
      ],
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      this.$http.plain
        .post('/signin', { email: this.email, password: this.password })
        .then((response) => this.signinSuccessful(response))
        .catch((error) => this.signinFailed(error));
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      }

      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = '';
      this.$router.replace('/records');
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        '';

      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/records');
      }
    },
  },
};
</script>
