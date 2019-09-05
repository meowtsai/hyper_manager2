import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/

function Todo() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    //console.log(items);
    //console.log(text);
    const getId = () =>
        Math.random()
            .toString(36)
            .substring(2, 9);
    const handleSubmit = e => {
        setItems(items =>
            items.concat({
                text,
                id: getId(),
            })
        );

        setText('');
    };

    const handleRemove = (id) => {
        console.log("remove click", id)
        setItems(items => items.filter(item => item.id !== id));
    };

    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />{' '}
            <input type="button" value="Add" onClick={handleSubmit} />
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {' '}
                        {item.text} <button onClick={() => handleRemove(item.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Todo />, rootElement);
