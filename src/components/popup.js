import './popup.css';

const Popup = ({ trigger, setTrigger, children }) => {
  return trigger ? (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new entry</h5>
            <button className="close" onClick={() => setTrigger(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Popup;
