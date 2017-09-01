import { h } from "preact";

export default ({ icon, ...props }) => {
  const iconAsset = require(`src/assets/icons/${icon}.svg`).default;
  return <svg {...props}><use xlinkHref={iconAsset.url} /></svg>;
};
