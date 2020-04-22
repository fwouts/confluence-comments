export async function loadInlineCommentThreads(pageId) {
  const url = `https://${document.location.host}/wiki/rest/inlinecomments/1.0/comments?containerId=${pageId}`;
  const response = await fetch(url);
  const list = await response.json();
  const unresolvedList = list.filter(
    (thread) => !thread.resolveProperties.resolved
  );
  const replies = await Promise.all(
    unresolvedList.map((thread) => {
      return loadInlineCommentReplies(thread.id);
    })
  );
  return unresolvedList.reduce((acc, thread, index) => {
    acc[thread.markerRef] = {
      ...thread,
      replies: replies[index],
    };
    return acc;
  }, {});
}

export async function loadInlineCommentReplies(threadId) {
  const url = `https://${document.location.host}/wiki/rest/inlinecomments/1.0/comments/${threadId}/replies`;
  const response = await fetch(url);
  const list = await response.json();
  return list;
}
