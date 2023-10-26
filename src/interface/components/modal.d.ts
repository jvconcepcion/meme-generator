export interface ModalProps {
  isVisible?: boolean,
  modalTitle?: string,
  closeModalFunc?: () => void,
  children?: React.ReactNode
};