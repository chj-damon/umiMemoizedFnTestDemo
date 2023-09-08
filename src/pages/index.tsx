import { memo, useCallback, useState } from 'react';
import yayJpg from '../assets/yay.jpg';
import { useMemoizedFn } from 'ahooks';

export default function HomePage() {
  const [num, setNum] = useState("");

  function setRandomNumber() {
    setNum(Math.random().toFixed(2));
  }

  const handleCallback1 = () => {
    console.log("handleCallback");
  };

  const handleCallback2 = useCallback(() => {
    console.log('handleCallback');
  }, []);

  const handleCallback3 = useMemoizedFn(() => {
    console.log('handleCallback');
  })

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>测试memoizedFn是否真的有用</p>
      <p>
        <a href="rntemplate://form?username=chenjie&password=123">
          打开rnTemplate:URL传参{" "}
        </a>
      </p>
      <p>
        <a href="rntemplate://homepage">打开rnTemplate: 打开首页</a>
      </p>
      <p>
        <a href="rntemplate://mine">打开rnTemplate: 打开个人中心页面</a>
      </p>
      <p>
        <a href="rntemplate://hello">打开rnTemplate: 404页面</a>
      </p>
      <p>
        <a href="rntemplate://detail/123">打开rnTemplate: RESTFUL传参</a>
      </p>

      <button onClick={setRandomNumber}>set random number</button>

      <CompA num={num} />
      {/* <CompB onCallback={handleCallback1} /> */}
      {/* <CompB onCallback={handleCallback2} /> */}
      <CompB onCallback={handleCallback3} />
    </div>
  );
}

function CompA({num}: {num: string}) {
  console.log('CompA render');

  return (
    <div>
      <h2>CompA</h2>
      <p>number: { num}</p>
    </div>
  );
}

const CompB = ({ onCallback }: { onCallback: () => void }) => {
  console.log("CompB render");
  return (
    <div>
      <h2>CompB</h2>
      <button onClick={onCallback}>callback</button>
    </div>
  );
};

const CompBWithMemo = memo(({ onCallback }: { onCallback: () => void }) => {
  console.log('CompB render');
  return (
    <div>
      <h2>CompB</h2>
      <button onClick={onCallback}>callback</button>
    </div>
  );
});
