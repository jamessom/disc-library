<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-gray-200 shadow rounded">
      <h3 class="text-2xl mb-6 text-gray-600">Sign In</h3>
      <form @submit.prevent="signup">
        <div class="text-red-700" v-if="error">{{ error }}</div>

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

        <div class="mb-6">
          <label for="password" class="label">Password confirmation</label>
          <input
            type="password"
            id="passwordConfirmation"
            class="input"
            v-model="passwordConfirmation"
            placeholder="email@email.com"
          />
        </div>

        <button :class="this.buttonClasses.join(' ')">Sign Up</button>

        <div class="my-4">
          <router-link class="link" to="/">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
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
    signup() {
      this.$http.plain
        .post('/signup', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error));
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
        'Somethinh went wrong';

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
