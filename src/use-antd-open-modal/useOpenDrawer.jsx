import React, {
  useState,
  useContext,
} from 'react';
import { Drawer } from 'antd';
import { OpenModalContext } from './common';


const useOpenDrawer = () => {
  const { add, remove } = useContext(OpenModalContext);

  return (
    innerReactDom,
    drawerOptions = {},
    {
      beforeClose = () => Promise.resolve(),
    } = {},
  ) => new Promise((resolve, reject) => {
    const InnerReactComponent = () => {
      const [options, setOptions] = useState(drawerOptions);
      const [visible, setVisible] = useState(true);
      const close = () => {
        setVisible(false);
        // ç±äº antd Drawer æ²¡æ afterClose åè°ï¼æä»¥å¿é¡»å¨å³é­æ¶æå·¥éæ¯ç»ä»¶
        setTimeout(() => {
          remove(id);
        }, 300);
      };

      return <Drawer
        // default options
        footer={null}
        maskClosable={false}
        // custom modal options
        {...options}
        // force options
        visible={visible}
        onClose={() => {
          beforeClose()
            .then(() => {
              close();
            });
        }}
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
      </Drawer>;
    };

    const id = add(InnerReactComponent);
  });
};

export default useOpenDrawer;
