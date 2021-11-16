import ReactDOM from 'react-dom';

function createDialog({ title, subtitle, comment = '' }, onYes, onNo) {
    ReactDOM.render(
        <div className="dialog-container">
            <div className="dialog">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <p className="comment">{comment}</p>
                <div className="dialog-buttons">
                    <button>Nie dodawaj</button>
                    <button onClick={onYes}>Dodaj</button>
                </div>
            </div>
        </div>,
        document.getElementById('dialog')
    );
}

export default createDialog;
