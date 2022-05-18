import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';

interface IProps {
  modeler: any;
}

export default function XmlPreview(props: IProps) {
  const { modeler } = props;

  const [xml, setXml] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = async () => {
    setIsModalVisible(true);

    let result = await modeler.saveXML({ format: true });
    const { xml } = result;
    setXml(xml);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCopy = () => {
    if (navigator) {
      navigator.clipboard
        .writeText(xml)
        .then((r) => message.info('已复制到剪贴板'));
    }
  };

  return (
    <>
      <Button type="primary" size={'small'} onClick={showModal}>
        预览XML
      </Button>
      <Modal
        width={800}
        style={{ maxHeight: '50vh' }}
        title="正在预览"
        visible={isModalVisible}
        okText={'复制'}
        cancelText={'关闭'}
        onOk={handleCopy}
        onCancel={handleCancel}
      >
        {/* todo 此处可以设置字符串过长时显示 展开、收缩 按钮，以便查看 */}
        <pre>{xml}</pre>
      </Modal>
    </>
  );
}
