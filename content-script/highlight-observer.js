function lookupHighlights(threads) {
  const highlightElements = document.querySelectorAll(
    'span[data-mark-type="annotation"][data-mark-annotation-type="inlineComment"]'
  );
  console.log(`Found ${highlightElements.length} inline comments.`);
  for (const highlightElement of highlightElements) {
    if (highlightElement.hasAttribute("data-already-improved")) {
      continue;
    }
    highlightElement.setAttribute("data-already-improved", "1");
    const commentThreadId = highlightElement.getAttribute("data-id");
    const thread = threads[commentThreadId];
    if (!thread) {
      console.warn(
        `Could not find data for comment thread ${commentThreadId}.`
      );
      continue;
    }
    const replyCount = thread.replies.length;
    const countElement = document.createElement("div");
    countElement.className = "comment-reply-count";
    countElement.textContent = replyCount;
    highlightElement.append(countElement);
  }
}

export function observeHighlights(threads) {
  setInterval(() => lookupHighlights(threads), 1000);
}
