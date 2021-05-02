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

      <input type="submit" value="Add artist" :class="buttonAddClasses" />
    </form>

    <hr class="border border-gray-200 my-6" />

    <ul class="list-reset mt-4">
      <li
        class="py-4"
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
      >
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center">
            <MusicArtistIcon />
            {{ artist.name }}
          </p>

          <button
            :class="this.buttonEditClasses.join(' ')"
            @click.prevent="editArtist(artist)"
          >
            Edit
          </button>

          <button
            :class="this.buttonRemoveClasses.join(' ')"
            @click.prevent="removeArtist(artist)"
          >
            Delete
          </button>
        </div>

        <div v-if="artist === editedArtist">
          <form @submit.prevent="updateArtist(artist)">
            <div class="mb-6 p-4 bg-white rounder border border-gray-200 mt-4">
              <input class="input" v-model="artist.name" />
              <input
                type="submit"
                value="Update"
                :class="this.buttonUpdateClasses.join(' ')"
              />
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MusicArtistIcon from '@/components/icons/musicArtist';
const baseButtonClasses = [
  'bg-transparent',
  'text-sm',
  'border',
  'no-underline',
  'py-2',
  'px-4',
  'font-bold',
  'rounded',
  'hover:text-white',
];

export default {
  name: 'Artists',
  data() {
    return {
      artists: [],
      newArtist: [],
      error: '',
      editArtist: '',
      buttonAddClasses: [
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
      buttonEditClasses: [
        ...baseButtonClasses,
        'hover:bg-blue',
        'text-blue',
        'border-blue',
        'mr-2',
      ],
      buttonRemoveClasses: [
        ...baseButtonClasses,
        'hover:bg-red',
        'text-red',
        'border-red',
      ],
      buttonUpdateClasses: [
        ...baseButtonClasses,
        'my-2',
        'hover:bg-blue',
        'text-blue',
        'border-blue',
        'cursor-pointer',
      ],
    };
  },
  components: {
    MusicArtistIcon,
  },
  created() {
    if (!localStorage.signedIn) {
      return this.$router.replace('/');
    }

    return this.$http.secured
      .get('/api/v1/artists')
      .then(response => (this.artists = response.data))
      .catch(err => this.setError(err, 'Something went wrong'));
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    addArtist() {
      const value = this.newArtist;

      if (!value) {
        return;
      }

      this.$http.secured
        .post('/api/v1/artists', {
          artist: {
            name: this.newArtist.name,
          },
        })
        .then(response => {
          this.artist.push(response.data);
          this.newArtist = '';
        })
        .catch(err => this.setError(err, 'Cannot create artist'));
    },
    removeArtist(artist) {
      this.$http.secured
        .delete(`/api/v1/artists/${artist.id}`)
        .then(() => this.artist.splice(this.artists.indexOf(artist), 1))
        .catch(err => this.setError(err, 'Cannot delete artist'));
    },
    editArtist(artist) {
      this.editArtist = artist;
    },
    updateArtist(artist) {
      this.editArtist = '';
      this.$http.secured
        .patch(`/api/v1/artists/${artist.id}`, {
          artists: {
            name: artist.name,
          },
        })
        .catch(err => this.setError(err, 'Cannot update artist'));
    },
  },
};
</script>
