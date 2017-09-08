import { h } from "preact";

const Icon = ({ icon, ...props }) => {
  const iconAsset = require(`src/assets/icons/${icon}.svg`).default;
  return <svg {...props}><use xlinkHref={iconAsset.url} /></svg>;
};

export default Icon;
