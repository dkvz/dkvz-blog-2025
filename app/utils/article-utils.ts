
// Semi-arbitrary measure of how many words per minute a human
// can read
const wordsPerMinute = 200
// I use a linear regression model for the estimations
// It's not AI but is a pretty good predictor that doesn't
// require 4 RTX 5090 graphics cards.
const beta = 0.12318806842671491
const alpha = -23.450114456215488

/**
 * Returns an estimation of the reading time in minutes based 
 * on the amount of characters given as argument
 */
const evaluateReadingTime = (length: number): number => {
  // Based on a project I created to find a prediction model 
  // for word count based on the UTF-16 length reported by JS:
  // https://github.com/dkvz/blog-stats
  return Math.round((beta * length + alpha) / wordsPerMinute)
}

export const readingTimeDescription = (length: number): string => {
  const time = evaluateReadingTime(length)
  // The time is in minutes
  if (time > 50) {
    return "Beaucoup trop de minutes de lecture"
  } else if (time < 1) {
    return "Quasi immédiat"
  } else {
    return `${time} minutes de lecture${time > 30 ? ' (désolé)' : ' (facile)'}`
  }
}

// Attempt to parse the crazy date format my backend sends
// Example:
// 25/08/2025  8:40:58+00:00
// The hours can fill the previous space character as well
// I really should change that someday
export const parseBlogDateFormat = (d: string): Date => {
  // Might return an invalid date when the source string
  // is just too crazy
  // This code is extremely ugly I'm so sorry
  const day = parseInt(d.substring(0, 2))
  const month = parseInt(d.substring(3, 5))
  const year = parseInt(d.substring(6, 10))
  // Might contain a space but doesn't matter
  const hours = parseInt(d.substring(11, 13))
  const minutes = parseInt(d.substring(14, 16))
  const seconds = parseInt(d.substring(17, 19))

  return new Date(year, month - 1, day, hours, minutes, seconds)
}
