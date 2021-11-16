import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './App.css';
import replacePolishLetters from './helpers/replacePolishLetters';

import fileDrop from './assets/fileDrop.svg';
import Dialog from './Dialog';

function App() {
    const [list, setList] = useState([]);
    const [finalList, setFinalList] = useState([]);

    const [fileName, setFileName] = useState('Przeciągnij plik CSV tutaj');

    const [comment, setComment] = useState('');
    const [curr, setCurr] = useState(0);

    // handle file upload
    const onDrop = useCallback((acceptedFiles) => {
        const dropzone = document.querySelector('.dropzone');
        const drop = document.querySelector('.dropzone-inner p');

        drop.innerHTML = acceptedFiles[0]['name'];
        drop.style.color = 'green';

        dropzone.style.borderColor = 'green';
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    // run python script
    const runPy = () => {
        window.api.getThing().then((res) => {
            var data = res;
            data = JSON.parse(data);

            data.forEach((elem, i) => {
                elem['id'] = i;
                elem['name'] = replacePolishLetters(elem['name']);
            });

            setList(data);
        });
    };

    const table = () => {
        const doc = new jsPDF();

        doc.autoTable({
            body: [...finalList],
            columns: [
                { header: 'Name', dataKey: 'name' },
                { header: 'Note', dataKey: 'note' },
                { header: 'Total', dataKey: 'total' },
                { header: 'Shipping', dataKey: 'delivery' },
            ],
        });

        doc.save('table.pdf');
    };

    const prepareTable = () => {
        document.querySelector('.dialog-container').style.display = 'flex';
        var currentInx = curr;
        var elemsToAdd = [];
        for (var i = curr; i < list.length; i++) {
            if (list[i].note !== '') {
                // if there IS a comment, then display it and break out of the loop
                setComment(list[currentInx].note);
                setCurr(currentInx + 1);

                break;
            } else {
                // if there IS NOT a comment, then just add to finalList

                elemsToAdd.push(list[currentInx]);
                currentInx += 1;

                if (i >= list.length - 1) {
                    setCurr(currentInx);
                    break;
                }
            }
        }
        // append iterated list to finalList
        console.log(finalList);
        setFinalList([...finalList, ...elemsToAdd]);
    };

    // handle dialog YES / NO
    const onYes = () => {
        if (list.length > curr) {
            setFinalList(list[curr - 1]);
            setTimeout(() => {
                prepareTable();
            }, 1000);
        } else {
            table();
        }
    };

    const onNo = () => {
        if (list.length - 1 >= curr) {
            // if the user chose YES, and there are items left
            prepareTable();
        } else {
            // if the user chose NO, and there are NO items left
            table();
        }
    };

    useEffect(() => {
        console.log(finalList);
    }, [finalList]);
    return (
        <div className="App">
            <Dialog
                title="Sprzdaż z komentarzem"
                subtitle="Czy chcesz uwzlędnić sprzedaż tym komentarzem:"
                comment={comment}
                onYes={onYes}
                onNo={onNo}
            />
            <button onClick={runPy}>Run</button>
            <h1>Przygotuj wykaz sprzedaży</h1>
            <p className="main-subtitle">
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                consectetur.
            </p>
            <div className="input-container">
                <label className="smaller" htmlFor="">
                    Widoczny tytuł
                </label>
                <input type="text" />
            </div>
            <div className="input-container">
                <label className="smaller" htmlFor="">
                    Miesiąc i rok
                </label>
                <input type="text" />
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
                        <p className="smaller">
                            Upewnij się, że plik zawiera wszystkie potrzebne
                            kolumny
                        </p>
                    </div>
                )}
            </div>
            <button onClick={prepareTable}>Generuj wykaz</button>
        </div>
    );
}

export default App;
