console.log(require);
const icons = require.context('./icons/', false, /\.(svg)$/);
console.log(icons);
const myName=  'Serg';
console.log('js init', myName);