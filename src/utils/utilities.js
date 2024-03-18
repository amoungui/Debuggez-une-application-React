/* eslint-disable no-bitwise */
function hashCode(s) {
    if (s === undefined) {
        return 0;  // ou retournez une autre valeur par défaut
    }
        // eslint-disable-next-line no-param-reassign
        return s.split('').reduce((a,b)=> {a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}
  
  
export default hashCode;