export const fadeIn = (trigger = true) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: trigger ? 1 : 0,
    transition: { 
      duration: 1,
    },
  }
})

export const fadeOut = (trigger = true) => ({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: trigger ? 0 : 1,
    transition: { 
      duration: 1,
    },
  }
})