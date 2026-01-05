interface TitleProps {
  text?: string;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = (props) => {
  return <h1 style={props.style}>{props.text}</h1>;
};

export default Title;
