import { useState } from "react";
import "./Accordian.scss";

const Accordian = (props: any): JSX.Element => {
  const [selected, setSelected] = useState(null);

  const data = [
    {
      id: 1,
      title: "something",
      body: "something else!",
    },
    {
      id: 2,
      title: "something2",
      body: "something else!2",
    },
  ];

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };
  return (
    <div className="accordian">
      {data.map((data: any, index: number) => (
        <div className="accordian-item">
          <div className="accordian-title" onClick={() => toggle(index)}>
            <h2>{data.title}</h2>
            <span>{selected === index ? "-" : "+"}</span>
          </div>
          <div
            className={
              selected === index
                ? "accordian-body show"
                : "accordian-body"
            }
          >
            {data.body}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordian;
