"use client"

import React, { useEffect } from 'react';
import { storeContext } from './store';
import actionTypes from './actions';

export default function Todo() {
    const {state, dispatch} = React.useContext(storeContext);
    const [todo, setTodo] = React.useState('')
    const [pokemon, setPokemon] = React.useState({})
    const handleTOdo = () => {
      dispatch({ type: actionTypes.ADD_TODO, payload: todo })
      setTodo('');
    }

    return (
        <div>
            <button onClick={handleTOdo}>
                Pagination POC
            </button>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} type='text' />
            {state?.list?.length > 0 && state.list.map((todo, index) => (
                <div key={index}>{todo}</div>
            ))}
            <hr />
        </div>
    );
}
