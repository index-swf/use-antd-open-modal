import React, {
  useState,
  useContext,
} from 'react';
import { Modal } from 'antd';
import { OpenModalContext } from './common';


const useOpenModal = () => {
  const { add, remove } = useContext(OpenModalContext);

  return (
    innerReactDom,
    modalOptions = {},
    {
      beforeClose = () => Promise.resolve(),
    } = {},
  ) => new Promise((resolve, reject) => {
    const InnerReactComponent = () => {
      const [options, setOptions] = useState(modalOptions);
      const [visible, setVisible] = useState(true);
      const close = () => {
        setVisible(false);
      };
      const destroy = () => {
        remove(id);
      };

      return <Modal
        // default options
        footer={null}
        maskClosable={false}
        // custom modal options
        {...options}
        // force options
        visible={visible}
        destroyOnClose
        onCancel={() => {
          beforeClose()
            .then(() => {
              close();
            });
        }}
        afterClose={destroy}
      >{React.cloneElement(innerReactDom, {
        ...innerReactDom.props,
        onSuccess: (result) => {
          close();
          resolve(result);
        },
        onError: (error) => {
          close();
          reject(error);
        },
        onCancel: () => {
          close();
        },
        onResetOption: (options) => {
          setOptions((prevOptions) => ({ ...prevOptions, ...options }));
        },
      })}
      </Modal>;
    };

    const id = add(InnerReactComponent);
  });
};

export default useOpenModal;
