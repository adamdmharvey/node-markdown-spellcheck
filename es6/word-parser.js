export default function (tokens) {
  const wordList = [];
  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let text = token.text;
    let index = token.index;
    while(true) {
      const nextWord = text.match(/(\w+(\.\w+)+\.?)|[\u00c0-\u00ff\w'\u2018-\u2019][\-#\u00c0-\u00ff\w'\u2018-\u2019]*/);
      if (!nextWord) {
        break;
      }

      if (!nextWord[0].match(/^[0-9,\.\-#]+$/)) {
        let word = nextWord[0];
        let thisWordIndex = index + nextWord.index;

        if (word.match(/^['\u2018]/)) {
          thisWordIndex += 1;
          word = word.substr(1, word.length - 1);
        }
        if (word.match(/['\u2019]$/)) {
          word = word.substr(0, word.length - 1);
        }
        wordList.push({word: word, index: thisWordIndex});
      }
      index += nextWord.index + nextWord[0].length;
      text = text.slice(nextWord.index + nextWord[0].length);
    }
  }
  return wordList;
}