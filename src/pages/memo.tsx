import { useCallback, useState } from "react";

export default function App() {
  const [flag, setFlag] = useState(false);

  const ChildFn = useCallback(
    (arr: number[]) => arr.map((item) => Math.pow(item, 2)),
    []
  );

  const data = ChildFn([2, 4, 5]);
  console.log(data);

  return (
    <div className="App">
      <div>我是data:{data}</div>
      <button onClick={() => setFlag((flag) => !flag)}>状态切换</button>
    </div>
  );
}
