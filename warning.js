const params = new URLSearchParams(window.location.search);
const blockedUrl = params.get('url');
const reason = params.get('reason');

// Customize explanation based on reason
const explanations = {
  safebrowsing: "Google's safety systems flagged this site as dangerous. It may try to steal your information or install harmful software.",
  pattern: "This site is using language commonly used in scams — like promising free game currency or prizes that require your personal details.",
  default: "Something about this site looks suspicious. It's safer to go back."
};

document.getElementById('explanation').textContent = 
  explanations[reason] || explanations.default;

document.getElementById('go-back').onclick = () => history.back();

document.getElementById('ask-parent').onclick = () => {
  chrome.runtime.sendMessage({ type: "NOTIFY_PARENT", url: blockedUrl });
  document.getElementById('ask-parent').textContent = "✓ Parent notified!";
};

document.getElementById('proceed').onclick = () => {
  if (confirm("Are you sure? This site may not be safe.")) {
    window.location.href = blockedUrl;
  }
};