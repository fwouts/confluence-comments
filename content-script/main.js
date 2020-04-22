import { observeHighlights } from "./highlight-observer.js";
import { loadInlineCommentThreads } from "./comments-loader.js";
import { getPageId } from "./confluence.js";

(async () => {
  const pageId = await getPageId();
  const threads = await loadInlineCommentThreads(pageId);
  observeHighlights(threads);
})().catch(console.error);
