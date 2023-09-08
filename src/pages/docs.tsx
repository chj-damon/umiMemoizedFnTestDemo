import React from "react";
import CSSMotionList from "rc-animate/lib/CSSMotionList";
import classNames from "classnames";
import toArray from "rc-util/lib/Children/toArray";
// import {Table} from "antd";
import ProTable from "@ant-design/pro-table";
import "./animation.less";
import { Button } from "antd";

type MotionBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const MotionBody: React.FC<MotionBodyProps> = ({ children, ...props }) => {
  const nodeList = toArray(children);
  const nodesRef = React.useRef<Record<React.Key, React.ReactElement>>({});

  console.log(children);
  // Better apply clean up logic to avoid OOM
  const keys: React.Key[] = [];
  nodeList.forEach((node) => {
    const { key } = node;
    if (key) { 
      nodesRef.current[key] = node;
      keys.push(key);
    }
  });

  return (
    <tbody {...props}>
      <CSSMotionList keys={keys} component={false} motionName="move">
        {({ key, className }) => {
          const node = nodesRef.current[key];
          return React.cloneElement(node, {
            className: classNames(node.props.className, className),
          });
        }}
      </CSSMotionList>
    </tbody>
  );
};

interface RecordType {
  a: string;
  b?: string;
  c?: string;
  key: React.Key;
}

interface DemoState {
  data: RecordType[];
}

class Demo extends React.Component<{}, DemoState> {
  columns = [
    { title: "title1", dataIndex: "a", key: "a", width: 100 },
    { id: "123", title: "title2", dataIndex: "b", key: "b", width: 100 },
    { title: "title3", dataIndex: "c", key: "c", width: 200 },
    {
      title: "Operations",
      dataIndex: "",
      key: "d",
      render: (text: string, record: RecordType) => (
        <a onClick={(e) => this.onDelete(record.key, e)} href="#">
          Delete
        </a>
      ),
    },
  ];

  state: DemoState = {
    mode: "infinite",
    data: [],
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        data: [
          { a: "123", key: "1" },
          { a: "cdd", b: "edd", key: "2" },
          { a: "1333", c: "eee", key: "3" },
        ],
      });
    }, 2000);
  }

  onDelete = (key: React.Key, e: React.MouseEvent<HTMLElement>) => {
    console.log("Delete", key);
    e.preventDefault();
    this.setState(({ data }) => ({
      data: data.filter((item) => item.key !== key),
    }));
  };

  onAdd = () => {
    this.setState(({ data }) => {
      const newData = [
        { key: "1", a: "666" },
        { key: "2", b: "777" },
        { key: "4", a: "888", b: "999", c: "000" },
      ];
      // 对data进行合并，如果key相同，合并，如果key不相同，添加
      const mergeData = [...data];
      newData.forEach((item) => {
        const index = data.findIndex((newItem) => newItem.key === item.key);
        if (index > -1) {
          mergeData[index] = { ...mergeData[index], ...item };
        } else {
          mergeData.push(item);
        }
      });
      return {
        data: mergeData,
      };
    });
  };

  switchMode = () => {
    this.setState(({ mode }) => ({
      mode: mode === "infinite" ? "pagination" : "infinite",
    }));
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        {this.state.mode === "infinite" && (
          <button type="button" onClick={this.onAdd}>
            添加
          </button>
        )}
        <ProTable
          headerTitle="订单管理"
          columns={this.columns}
          dataSource={this.state.data}
          components={{
            body: { wrapper: MotionBody },
          }}
          rowKey={"key"}
          search={false}
          sticky
          dateFormatter="string"
          loading={this.state.data.length === 0}
          pagination={false}
          toolBarRender={() => [
            <Button type="primary" onClick={this.switchMode}>
              {this.state.mode === "inifite"
                ? "切换为历史数据"
                : "切换为实时数据"}
            </Button>,
          ]}
        />
      </div>
    );
  }
}

export default Demo;
