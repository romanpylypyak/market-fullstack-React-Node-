export function accessStatus(access) {
    return {
      type: 'ACCESS_STATUS',
      payload: access,
    }
}

export function currentUser(userData) {
  return {
    type: 'CURRENT_USER',
    payload: userData,
  }
}