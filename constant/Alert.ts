const alert = ({ message }: { message: string }): void => {
  window.alert(message)
}

const confirm = ({
  message,
  onConfirmClick,
  onCancelClick,
}: {
  message: string
  onConfirmClick: () => void
  onCancelClick?: () => void
}): void => {
  if (window.confirm(message)) {
    onConfirmClick()
  } else {
    onCancelClick && onCancelClick()
  }
}

export default {
  alert,
  confirm,
}
