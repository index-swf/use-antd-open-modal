import React, {
  useState,
  useContext,
} from 'react';
import { Modal } from 'antd';
import { defaultBeforeClose, defaultOption, OpenModalContext, UseOpenModalType } from './common';


const useOpenModal: UseOpenModalType = () => {
  const { add, remove } = useContext(OpenModalContext);

  return (
    innerReactDom,
    modalOptions = {},
    { beforeClose = defaultBeforeClose } = defaultOption
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
        onSuccess: (result: any) => {
          close();
          resolve(result);
        },
        onError: (error: any) => {
          close();
          reject(error);
        },
        onCancel: () => {
          close();
        },
        onResetOption: (options: any) => {
          setOptions((prevOptions) => ({ ...prevOptions, ...options }));
        },
      })}
      </Modal>;
    };

    const id = add(InnerReactComponent);
  });
};

export default useOpenModal;
