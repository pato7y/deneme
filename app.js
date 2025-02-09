document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function () {
        const fileType = file.type;

        if (fileType === "application/pdf") {
            extractTextFromPdf(fileReader.result);
        } else if (fileType === "text/plain") {
            document.getElementById('textDisplay').value = fileReader.result;
        } else {
            alert('Unsupported file type');
        }
    };

    if (file.type === "application/pdf") {
        fileReader.readAsArrayBuffer(file);
    } else {
        fileReader.readAsText(file);
    }
}

function extractTextFromPdf(pdfData) {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then(function (pdf) {
        let text = "";
        let numPages = pdf.numPages;

        for (let i = 1; i <= numPages; i++) {
            pdf.getPage(i).then(function (page) {
                page.getTextContent().then(function (textContent) {
                    textContent.items.forEach(function (item) {
                        text += item.str + " ";
                    });
                    document.getElementById('textDisplay').value = text;
                });
            });
        }
    });
}

// 6. Adım: Text-to-Speech İşlevselliği
// const synth = window.speechSynthesis;
// let utterance;

// document.getElementById('speakButton').addEventListener('click', () => {
//     const text = document.getElementById('textDisplay').value;

//     if (text.trim() !== "") {
//         utterance = new SpeechSynthesisUtterance(text);
//         synth.speak(utterance);
//     } else {
//         alert('Please load a file or enter some text first.');
//     }
// });

// document.getElementById('stopButton').addEventListener('click', () => {
//     if (synth.speaking) {
//         synth.cancel();
//     }
// });


const synth = window.speechSynthesis;
let utterance;

document.getElementById('speakButton').addEventListener('click', () => {
    const text = document.getElementById('textDisplay').value;

    if (text.trim() !== "") {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';  // Set the language to English (US)
        synth.speak(utterance);
    } else {
        alert('Please enter some text first.');
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }
});