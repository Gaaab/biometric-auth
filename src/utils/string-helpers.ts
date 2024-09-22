export const extractLastDigits = (input: string): string => {
  if (!input) return ''
  // Match the last group of digits after the last hyphen
  const match = input.match(/-(\d+)$/)

  if (match) {
    const digits = match[1] // Extract the matched digits
    // Return the last 4 digits
    return Number(digits.slice(-4)).toString()
  }

  // If there's no match or hyphen, return an empty string
  return ''
}

export const formatString = (str: string): string => {
  if (!str) return str
  return str.replace(/([A-Z])/g, ' $1').trim()
}

export const removeTrailingSlash = (str: string): string => str.replace(/\/+$/, '')

export const truncate = (str: string | null, num = 16) => {
  if (!str) return str
  if (str.length <= num) return str
  return '' + str.slice(0, num) + '...'
}

export const capitalize = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : ''
}

export const camelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const generateRandomString = (length = 6, randomString = ''): string => {
  randomString += Math.random().toString(20).substr(2, length)
  if (randomString.length > length) return randomString.slice(0, length)
  return generateRandomString(length, randomString)
}

export const snakeCase = (str: string) => {
  if (!str) return str
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')
}

export const explode = (str: string, separator = ','): Array<string> => {
  if (!str) return []
  return str.split(separator)
}

export const formatMessageIntoHtmlList = (errorMessage: string) => {
  if (errorMessage.indexOf('|') !== -1) {
    const messagesAsList = errorMessage
      .split('|')
      .map((message) => {
        return `<li>${message}</li>`
      })
      .join('')

    // @TODO: Truncate if has more than 30+ rows

    errorMessage = `<ol>
      ${messagesAsList}
    </ol>`
  }

  return errorMessage
}
