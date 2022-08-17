import { Modal } from 'antd'

interface Props_model {
  visible: boolean
  confirmLoading: boolean
  children: JSX.Element
  handleOk: () => void
  handleCancel: () => void
}

const Index = ({
  visible,
  confirmLoading,
  children,
  handleCancel,
  handleOk,
}: Props_model) => {
  return (
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  )
}

export default Index
