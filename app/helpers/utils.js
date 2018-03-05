export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid
  }
}

export function formatTitle(title) {
  return title.replace('-',' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}