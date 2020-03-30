/**
 *
 * @param obj JS any object { foo : 'bar', baz : 3 }
 * return serialized string for GET request e.g foo=bar&baz=3
 */
export function serialize(obj) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])));
    }
  }
  return str.length ? '?' + str.join("&") : '';
}
