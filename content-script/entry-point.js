// This is an entry point to the content script which gets us access to ES6
// modules.
//
// See https://stackoverflow.com/a/48121629/911298 for details.
//
// Yes, it's a hack.
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL("content-script/main.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);
