// Saves options to chrome.storage
function save_options() {
  var source = document.getElementById('source').value;
  chrome.storage.sync.set({
    prefsource: source,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
  }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    prefsource: 'gogo'
  }, function(items) {
    document.getElementById('source').value = items.prefsource;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
