import React, { useState, useContext } from "react";
import { Drawer } from "antd";
import { defaultBeforeClose, defaultOption, OpenModalContext, UseOpenDrawerType } from "./common";


const useOpenDrawer: UseOpenDrawerType = () => {
  const { add, remove } = useContext(OpenModalContext);

  return (
    innerReactDom,
    drawerOptions = {},
    { beforeClose = defaultBeforeClose } = defaultOption
  ) =>
    new Promise((resolve, reject) => {
      const InnerReactComponent = () => {
        const [options, setOptions] = useState(drawerOptions);
        const [visible, setVisible] = useState(true);
        const close = () => {
          setVisible(false);
          // 留出播完消失动画的时间
          setTimeout(() => {
            remove(id);
          }, 300);
        };

        return (
          <Drawer
            // default options
            footer={null}
            maskClosable={false}
            // custom modal options
            {...options}
            // force options
            visible={visible}
            onClose={() => {
              beforeClose().then(() => {
                close();
              });
            }}
          >
            {React.cloneElement(innerReactDom, {
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
          </Drawer>
        );
      };

      const id = add(InnerReactComponent);
    });
};

export default useOpenDrawer;
