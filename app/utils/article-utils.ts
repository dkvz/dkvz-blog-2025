
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
    return "Temps de lecture extrêmement court"
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

/**
 * I Recycled this hellish function from my previous blog.
 * Which was recycled from the one before it.
 * I have no idea what possessed me when I wrote this thing and
 * I don't want to look at it for too long.
 * I did TypeScript some stuff in there and left all the semicolons
 *
 * contentObj is the return value. Except it's not returned. Yeah
 * The actual return value is the length of characters that were
 * added to the content.
 */
export const addTOC = (
  contentObj: { toc: string, content: string },
  lvl: number,
  maxLvl: number,
  start: number,
  end: number,
  lvlStr: string
): number => {
  var count = 1;
  var lookingFor = '<h' + lvl + '>';
  var lookingForClose = '</h' + lvl + '>';
  lvlStr = lvlStr + '_' + lvl;
  var stopLooking = false;
  var hasElements = false;
  var addedChars = 0;
  while (!stopLooking) {
    var first = contentObj.content.indexOf(lookingFor, start);
    // Check if we did find an hX element:
    if (first >= 0 && first < end) {
      // Extract the title.
      // We have string.substring(start, end)
      // Find the end tag first:
      var closeTag = contentObj.content.indexOf(lookingForClose, first);
      if (closeTag < 0 || closeTag >= end) {
        closeTag = end;
      }
      // At this point we can add the <ul> to the TOC.
      if (!hasElements) {
        contentObj.toc += '<ul>';
        hasElements = true;
      }
      var title = contentObj.content.substring(first + lookingFor.length, closeTag);
      if (title.length === 0) {
        title = 'Empty Title';
      }
      // Add this title to the TOC:
      // <a onclick="app.scrollToItem('a1_1')">Go to top</a>
      // var anchor = '<a onclick="app.scrollToItem(\'' + lvlStr + '_' + lvl + '\')"></a>';
      // Let's do it generic first:
      var addLvlStrPartial = lvlStr + '_' + count;
      //contentObj.toc += '<li><a onclick="app.scrollToItem(\'' + addLvlStrPartial + '\')">' +
      //  title + '</a></li>\n';
      // With h element we can just use their id as an anchor:
      contentObj.toc += '<li><a href="#' + addLvlStrPartial + '" target="_self">' +
        title + '</a></li>\n';
      // Add the anchor, will look like this:
      // We need to add an id to the Hx element that we're working with here.
      var addLvlStr = ' id="' + addLvlStrPartial + '"';
      contentObj.content = contentObj.content.substring(0, first + 3) + addLvlStr +
        contentObj.content.substring(first + 3, contentObj.content.length);
      count++;
      addedChars += addLvlStr.length;
      // Now is time to make the recursion.
      // We need to know if there is a next hx element, or just use the whole content
      // length for this.
      // content has changed: the length is now bigger due to the id="".
      // Look for the next one. If no next one, we use the whole length of the content.
      // The variable end changedd because we modified content.
      end += addLvlStr.length;
      var next = contentObj.content.indexOf(lookingFor, first +
        lookingFor.length + addLvlStr.length);
      if (next < 0 || next >= end) {
        next = end;
      }
      if (lvl < maxLvl) {
        var added = addTOC(
          contentObj, lvl + 1, maxLvl, first, next, lvlStr + '_' + count
        );
        // When we get back here content may have changed a lot. The positions start
        // and end need to change.
        end += added;
      }
      // The variable start has to change for the loop to work.
      start = closeTag + lookingForClose.length + addLvlStr.length;
      if (start >= end) {
        start = end;
      }
    } else {
      // No more elements after this, we can stop looking.
      stopLooking = true;
      if (hasElements) {
        // We need to close the <ul> in the TOC.
        contentObj.toc += '</ul>';
      }
    }
  }
  return addedChars;
};
