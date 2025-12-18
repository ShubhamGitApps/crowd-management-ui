export const environment = {
  production: false,

  api: {
    baseUrl: 'https://hiring-dev.internal.kloudspot.com/api',

    auth: '/auth',
    analytics: '/analytics',
    crowd: '/crowd',
    sites: '/sites',
  },

  socket: {
    url: 'https://hiring-dev.internal.kloudspot.com',
    transports: ['websocket'],
  },
};
