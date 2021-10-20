module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
    devServer: {
    open: process.platform === 'darwin',
    host: '82.165.53.92',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false, 
    
  },
}
