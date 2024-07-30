import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase", "success")
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success")
    }

    const handleSpeakClick = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Text is converted to Speech", "success")
    }

    const handleClearClick = () => {
        setText('');
        props.showAlert("Text Cleared", "success")
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
        props.showAlert("Extra spaces are removed", "success")
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox")
        text.select()
        navigator.clipboard.writeText(text.value)
        props.showAlert("Text Copied", "success")
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const wordCount = (text) => {
        let regex = /\s+\S+/;
        let numOfWords = text.split(regex);
        return numOfWords.length;
      }

    return (
        <>
            <div className='container' style={{ color: props.mode==='light'?'#042743':'white' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode==='light'?'white':'#212529', color: props.mode==='light'?'#042743':'white' }} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleSpeakClick}>Speak Text</button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button> 
                <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear Text</button>        
            </div>
            <div className="container my-3" style={{ color: props.mode==='light'?'#042743':'white' }}>
                <h2>Your Text Summary</h2>
                <p>{text===""? 0 : wordCount(text)} words and {text.length} characters</p>
                <p>{text===""? 0 * 0.008 : wordCount(text) * 0.008} Minutes to Read</p>
                <h2>Preview</h2>
                <p >{text.length>0?text:"Enter Something in Textbox above to Preview it here."}</p>
            </div>
        </>
    );
}
