export const convertBytes = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`
  } else if (bytes < 1024 * 1024) {
    const kilobytes = bytes / 1024
    const formattedKB = kilobytes.toFixed(1)
    return `${formattedKB} KB`
  } else {
    const megabytes = bytes / (1024 * 1024)
    const formattedMB = megabytes.toFixed(1)
    return `${formattedMB} MB`
  }
}