export async function getPageId() {
  if (
    !window.Confluence ||
    !window.Confluence.getContentId ||
    !window.Confluence.getContentId()
  ) {
    await sleep(1000);
    return getPageId();
  }
  return window.Confluence.getContentId();
}

function sleep(durationMillis) {
  return new Promise((resolve) => setTimeout(resolve, durationMillis));
}
