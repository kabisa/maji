import { h } from "preact";

export default props => {
  require(`svg-sprite-loader!src/styles/icons/${props.id}.svg`);
  return <svg {...props}><use xlinkHref={"#" + props.id} /></svg>;
};
