import { Modal } from 'antd'

interface Props_model {
  visible: boolean
  confirmLoading?: boolean
  children: JSX.Element
  handleOk: () => void
  handleCancel: () => void
  title?: string
  type?: 'add' | 'delete'
}

const Index = ({
  visible,
  confirmLoading,
  children,
  handleCancel,
  handleOk,
  title,
  type,
}: Props_model) => {
  // switch (type) {
  //   case 'add':
  //     return (
  //       <Modal
  //         title={title || '标题'}
  //         visible={visible}
  //         onOk={handleOk}
  //         confirmLoading={confirmLoading}
  //         onCancel={handleCancel}
  //         cancelText={'取消'}
  //         okText={'确认'}
  //       >
  //         {children}
  //       </Modal>
  //     )
  //     case 'delete':
  //       return
  //   default:
  //     break;
  // }
  return (
    <Modal
      title={title || '标题'}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText={'取消'}
      okText={'确认'}
    >
      {children}
    </Modal>
  )
}

export default Index
