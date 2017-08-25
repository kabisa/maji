import { h } from "preact";

export default props => {
  const icon = require(`src/styles/icons/${props.id}.svg`).default;
  return <svg><use xlinkHref={icon.url} /></svg>;
};
