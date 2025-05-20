/* eslint-disable no-unused-expressions */
export const validateInputIconClassNames = ({ iconDirection, icon, type }) => {
  if (iconDirection === 'left') {
    if (icon || type === 'password') return 'pl-9'
    else ''
  }

  if (iconDirection === 'right') {
    return 'pr-9'
  }

  return ''
}
