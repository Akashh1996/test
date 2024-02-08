import React from 'react';
import Todo from './todo';
import Store from './store';
import Sidebar from './sidebar';
import PokeStore from './getpokestore';

export default function Home() {
    return (
        <Store>
            <PokeStore>
                <h1>Poc Pagination </h1>
                <Todo />
                <Sidebar />
            </PokeStore>
        </Store>
    );
}
