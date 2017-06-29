import createHistory from "history/createHashHistory";

let previous = null;
export const history = createHistory();

history.listen(function(location, action) {
  previous = action === "PUSH" ? location : null;
});

export function goBack(location) {
  if (previous) history.goBack();
  else history.replace(location);
}
