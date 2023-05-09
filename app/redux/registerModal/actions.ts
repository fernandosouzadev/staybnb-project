export const closeRegisterModal = () => ({
  type: 'registerModal/status',
  payload: false,
})

export const openRegisterModal = () => ({
  type: 'registerModal/status',
  payload: true,
})
