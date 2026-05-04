import React from "react";
import Modal from "./Modal";
import Button from "./Button";

/**
 * Confirmation dialog built on top of Modal.
 *
 * @param {object} props
 * @param {boolean} props.open - Controls visibility.
 * @param {function} props.onClose - Called to dismiss without confirming.
 * @param {function} props.onConfirm - Called when the user confirms.
 * @param {string} props.title - Dialog title.
 * @param {string|React.ReactNode} props.message - Descriptive body text.
 * @param {string} props.confirmLabel - Confirm button text (default "Confirm").
 * @param {string} props.cancelLabel - Cancel button text (default "Cancel").
 * @param {"danger"|"primary"|"success"} props.confirmVariant - Variant for the confirm button.
 * @param {boolean} props.loading - Shows spinner on confirm button and disables both buttons.
 */
export default function ConfirmDialog({
  open = false,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      footer={
        <>
          <Button
            variant="secondary"
            size="medium"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            size="medium"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="text-text-secondary text-sm">
        {typeof message === "string" ? <p>{message}</p> : message}
      </div>
    </Modal>
  );
}
