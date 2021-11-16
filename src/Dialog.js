import React from 'react';

function Dialog({ title, subtitle, comment, onYes, onNo }) {
    const confirm = () => {
        document.querySelector('.dialog-container').style.display = 'none';
        onYes();
    };

    const dismiss = () => {
        document.querySelector('.dialog-container').style.display = 'none';
        onNo();
    };

    return (
        <div className="dialog-container" style={{ display: 'none' }}>
            <div className="dialog">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <p className="comment">{comment}</p>
                <div className="dialog-buttons">
                    <button onClick={dismiss}>Nie dodawaj</button>
                    <button onClick={confirm}>Dodaj</button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
