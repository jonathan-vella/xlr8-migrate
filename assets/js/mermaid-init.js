document.addEventListener('DOMContentLoaded', function () {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true
    }
  });
  window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
});
