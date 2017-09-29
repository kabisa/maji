import registerIosNetworkActivity from "./cordova/ios-network-activity";

export default function() {
  if (!window.cordova) return;

  document.addEventListener(
    "deviceready",
    function() {
      registerIosNetworkActivity();
    },
    false
  );

  document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add(`platform-${cordova.platformId}`);
  });
}
