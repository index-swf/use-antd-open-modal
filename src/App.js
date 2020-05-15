import React, { useState } from "react";
import "./styles.css";
import "antd/dist/antd.css";
import { ConfigProvider, Button, Space, message, Table, Input } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {
  ContextProvider as ModalContextProvider,
  useOpenModal
} from "./use-antd-open-modal";

const TestReactComponent = () => (
  <>
    test component
    <br />
    some desc
  </>
);

const TestComponentWithCb = ({ onSuccess, onCancel }) => {
  return (
    <>
      <TestReactComponent />
      <br />
      <Space>
        <Button type="primary" onClick={onSuccess}>
          确定
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    </>
  );
};

const InputBox = ({ onSuccess }) => {
  const [value, setValue] = useState("");

  return (
    <Input.Search
      value={value}
      onChange={e => setValue(e.value)}
      enterButton="Enter"
      onSearch={onSuccess}
    />
  );
};

const Demo1 = () => {
  const openModal = useOpenModal();
  const onClick = () => {
    openModal(<TestReactComponent />);
  };
  return (
    <Button type="primary" onClick={onClick}>
      基础示例
    </Button>
  );
};

const Demo1_1 = () => {
  const openModal = useOpenModal();
  const onClick = () => {
    openModal(<Table />);
  };
  return (
    <Button type="primary" onClick={onClick}>
      Provider示例
    </Button>
  );
};

const Demo2 = () => {
  const openModal = useOpenModal();
  const onClick = () => {
    openModal(<TestReactComponent />, {
      // // dialog options, 跟 antd Modal 完全兼容
      title: "test title"
    });
  };
  return (
    <Button type="primary" onClick={onClick}>
      Modal选项示例
    </Button>
  );
};

const Demo3 = () => {
  const openModal = useOpenModal();
  const onClick = () => {
    openModal(<TestComponentWithCb />, {
      // // dialog options, 跟 antd Modal 完全兼容
      title: "test title"
    }).then(() => {
      message.success("您点了 确定！");
    });
  };
  return (
    <Button type="primary" onClick={onClick}>
      回调示例
    </Button>
  );
};

const Demo4 = () => {
  const openModal = useOpenModal();
  const onClick = () => {
    openModal(<InputBox />, {
      // // dialog options, 跟 antd Modal 完全兼容
      title: "请输入内容"
    }).then(text => {
      message.success(`您输入了${text}`);
    });
  };
  return (
    <Button type="primary" onClick={onClick}>
      回调传参示例
    </Button>
  );
};

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <ModalContextProvider>
        <div className="App">
          <h1>use-antd-open-modal Demos</h1>
          <Space>
            <Demo1 />
            <Demo1_1 />
            <Demo2 />
            <Demo3 />
            <Demo4 />
          </Space>
        </div>
      </ModalContextProvider>
    </ConfigProvider>
  );
}
