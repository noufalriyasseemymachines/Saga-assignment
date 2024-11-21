import React from "react";
import Button from "../Button/Button";
import "./DeleteModal.css";

const DeleteModal = ({
  onEdit,
  employeeToDelete,
  onConfirmDelete,
  onCancelDelete,
}) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <div className="delete-modal-header">
          <h2>Confirm Deletion</h2>
        </div>
        <div className="delete-modal-body">
          <p>{`Are you sure you want to delete employee "${employeeToDelete.fname}"?`}</p>
        </div>
        <div className="delete-modal-footer">
          <Button
            className="delete-modal-confirm"
            onClick={onConfirmDelete}
            value="Confirm"
          />
          <Button
            className="delete-modal-cancel"
            onClick={onCancelDelete}
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
