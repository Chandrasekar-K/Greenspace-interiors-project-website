const marked = require('marked');

function convertMarkdownToHtml(markdownText) {
  return marked(markdownText);  // Use the `marked` library to convert markdown to HTML
}

module.exports = { convertMarkdownToHtml };
