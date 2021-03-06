import axios from 'axios';

const baseConfig = {
  baseURL: `http://${process.env.API_HOST}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const securedAxiosInstance = axios.create(baseConfig);
const plainAxiosInstance = axios.create(baseConfig);

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase();

  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf,
    };
  }

  return config;
});

securedAxiosInstance.interceptors.request.use(null, error => {
  const responseConfigStatus =
    error.response &&
    error.response.config &&
    error.response.config.status === 401;

  if (!responseConfigStatus) {
    return Promise.reject(error);
  }

  return plainAxiosInstance
    .post(
      '/refresh',
      {},
      {
        headers: {
          'X-CSRF-TOKEN': localStorage.csrf,
        },
      },
    )
    .then(response => {
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;

      const retryConfig = error.response.config;
      retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;

      return plainAxiosInstance.response(retryConfig);
    })
    .catch(err => {
      delete localStorage.csrf;
      delete localStorage.signedIn;

      location.replace('/');

      return Promise.reject(err);
    });
});

export { securedAxiosInstance, plainAxiosInstance };
