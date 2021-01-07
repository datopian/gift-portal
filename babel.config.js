module.exports={
  'presets': ['next/babel'],
  'plugins': ['@babel/plugin-proposal-do-expressions',['inline-react-svg', {
    svgo: { plugins: [{
      cleanupIDs: false
    }]}
  }],]
}
