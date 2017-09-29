export default function() {
  if (!window.NetworkActivity) return;

  const origOpen = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function() {
    NetworkActivityIndicator.show();

    this.addEventListener("load", function() {
      NetworkActivityIndicator.hide();
    });

    origOpen.apply(this, arguments);
  };
}
