module.exports = {
  redirects: async () => {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: false /* redirect is temporary or permanent */
      }
    ]
  }
}
