
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
