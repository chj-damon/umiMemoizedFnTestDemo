import { Button } from "antd";
import { useState } from "react";
import { cloneDeep } from "lodash-es";

export default () => {
  const [widget, setWidget] = useState(new Widget());

  const handleClick = () => {
    widget.changeName("new Widget");

    setWidget(widget.clone());
  };

  return (
    <div>
      <div>widget name: {widget.state.name}</div>
      <Button onClick={handleClick}>修改Widget名字</Button>
    </div>
  );
};

class Widget {
  state: { name: string };

  constructor() {
    this.state = {
      name: "widget",
    };
  }

  changeName(name: string) {
    console.log(name, "name");
    this.state.name = name;
  }

  clone() {
    return cloneDeep(this);
  }
}
