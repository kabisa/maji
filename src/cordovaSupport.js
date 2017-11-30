import registerIosNetworkActivity from "./cordova/iOSNetworkActivity";

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
