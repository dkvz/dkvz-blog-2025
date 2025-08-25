/**
 * Returns an estimation of the reading time in minutes based 
 * on the amount of characters given as argument
 */
export const evaluateReadingTime = (length: number): number => {
  // Normally we'd need the word count and divide that by an 
  // average of about 200 WPM.
  // Character length is way more wonky especially since I also
  // have a WHOLE BUNCH of <p> tags in article content at the
  // moment.
  return Math.floor(length / 500)
}
