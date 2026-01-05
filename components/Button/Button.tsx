interface ButtonProps {
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props?.onClick}>
      {props.leftIcon && <span className="mr-2">{props.leftIcon}</span>}
      {props.title}
      {props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
    </button>
  );
};

export default Button;
