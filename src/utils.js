export const colors = [
  'crimson',
  'olivedrab',
  'dodgerblue',
  'deeppink',
  'gold',
  'coral',
]

export const generatePattern = (length = 4, allowRepeats = false) => {
  const pattern = []
  while (pattern.length < length) {
    const element = Math.floor(Math.random() * colors.length)
    if (allowRepeats === false && pattern.includes(element)) {
      continue
    }
    pattern.push(element)
  }

  return pattern
}

export const getResult = (secretPattern, userPattern) => {
  const result = []
  const exactMatches = []

  userPattern.forEach((element, index) => {
    if (secretPattern[index] === element) {
      result.push('black')
      exactMatches.push(element)
    }
  })

  userPattern.forEach((element) => {
    if (
      // was not part of the exact matches
      exactMatches.includes(element) === false &&
      // but is included in the secret pattern
      secretPattern.includes(element)
    ) {
      result.push('white')
    }
  })

  return result
}
