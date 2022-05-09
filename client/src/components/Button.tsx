import "./Button.scss";

export const Button = (props: any): JSX.Element => {
  return (
    <button onClick={props.onClick} className="generic-button">
      {props.title}
    </button>
  );
};
