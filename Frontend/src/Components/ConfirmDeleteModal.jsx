import "./ConfirmDeleteModal.css"
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Delete Post</h3>

                <p>Are you sure you want to delete this post?</p>

                <div className="modal-actions">
                    <button onClick={onConfirm}>
                        Yes
                    </button>

                    <button onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;