import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';

import fileDrop from './assets/fileDrop.svg';
import Dialog from './Dialog';
import pdfGenerate from './pdfGenerate';

function App() {
    const [list, setList] = useState([]);
    const [listWithComment, setListWithComment] = useState([]);
    const [finalList, setFinalList] = useState([]);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const [fileName, setFileName] = useState('Przeciągnij plik CSV tutaj');

    const [comment, setComment] = useState('');
    const [curr, setCurr] = useState(0);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // handle file upload
    const onDrop = useCallback((acceptedFiles) => {
        const dropzone = document.querySelector('.dropzone');
        const drop = document.querySelector('.dropzone-inner p');

        drop.innerHTML = acceptedFiles[0]['name'];
        drop.style.color = 'green';

        dropzone.style.borderColor = 'green';

        runPy(acceptedFiles[0]['path']);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleDropzone = (reset = 0, title) => {
        const dropzone = document.querySelector('.dropzone');
        const drop = document.querySelector('.dropzone-inner p');

        drop.innerHTML = title;
        drop.style.color = reset ? '#aaaaaa' : 'green';

        dropzone.style.borderColor = reset ? '#e7e7e7' : 'green';
    };

    // run python script and set data to state
    const runPy = (file) => {
        window.api.getThing(file).then(
            (res) => {
                var data = res;

                data = JSON.parse(data);

                setList(data[0]);
                setListWithComment(data[1]);

                setIsButtonDisabled(false);
            },
            (err) => {
                setIsButtonDisabled(true);
                console.log(err);
            }
        );
    };

    const prepareTable = () => {
        document.querySelector('.dialog-container').style.display = 'flex';
        var currentInx = curr;

        setComment(listWithComment[currentInx].note);
        setCurr(currentInx + 1);
    };

    const finalSorting = () => {
        // get data with comments and without comments
        let data = [...finalList, ...list];

        data = JSON.stringify(data);

        // sort data by id
        window.api.getSorted(data).then(
            (res) => {
                pdfGenerate(
                    JSON.parse(res)[0],
                    JSON.parse(res)[2],
                    title,
                    date
                );

                handleDropzone(1, 'Gotowe! Możesz wygenerować kolejny wykaz');
                setIsButtonDisabled(true);
                setCurr(0);
            },
            (err) => {
                console.log(err);
            }
        );
        // table(data);
    };

    // handle dialog YES / NO
    const onYes = () => {
        if (listWithComment.length > curr) {
            // if the user chose YES, add the current one to state and then show another comment
            setFinalList([...finalList, listWithComment[curr - 1]]);
            prepareTable();
        } else {
            // if there is no more items left, call finalSorting function
            setFinalList([...finalList, ...list]);
            finalSorting();
        }
    };

    const onNo = () => {
        if (listWithComment.length > curr) {
            // if the user chose NO, just show another comment
            prepareTable();
        } else {
            // if there is no more items left, call finalSorting function
            setFinalList([...finalList, ...list]);
            finalSorting();
        }
    };

    return (
        <div className="App">
            <Dialog
                title="Sprzdaż z komentarzem"
                subtitle="Czy chcesz uwzlędnić sprzedaż tym komentarzem:"
                comment={comment}
                onYes={onYes}
                onNo={onNo}
            />
            <h1>Przygotuj wykaz sprzedaży</h1>
            <p className="main-subtitle">
                Wprowadź potrzebne dane, oraz naciśnij "GENERUJ WYKAZ". Program
                przygotuje dla Ciebie wykaz w formacie PDF
            </p>
            <div className="input-container">
                <label className="smaller" htmlFor="">
                    Widoczny tytuł
                </label>
                <input type="text" onBlur={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-container">
                <label className="smaller" htmlFor="">
                    Miesiąc i rok
                </label>
                <input type="text" onBlur={(e) => setDate(e.target.value)} />
            </div>
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <div className="dropzone-inner-on-file-hover">
                        <img
                            src={fileDrop}
                            alt=""
                            style={{ transform: 'scale(1.4)' }}
                        />
                        <p>Upuść</p>
                        <p className="smaller">
                            Upewnij się, że plik zawiera wszystkie potrzebne
                            kolumny
                        </p>
                    </div>
                ) : (
                    <div className="dropzone-inner">
                        <img
                            src={fileDrop}
                            alt=""
                            style={{ transform: 'scale(1.4)' }}
                        />
                        <p>{fileName}</p>
                        {isButtonDisabled ? (
                            <p className="smaller">
                                Upewnij się, że plik zawiera wszystkie potrzebne
                                kolumny
                            </p>
                        ) : (
                            <p className="smaller">Udało się</p>
                        )}
                    </div>
                )}
            </div>
            <button disabled={isButtonDisabled} onClick={prepareTable}>
                Generuj wykaz
            </button>
        </div>
    );
}

export default App;
