'use client';

import React, { useContext, useEffect, useState } from 'react';
import { storeContext } from './getpokestore';
import actionTypes from './actions';
import Pagination from '@/pagination';

const limit = 20;

const getQueryParams = (url) => {
    if (!/\?/.test(url)) return {};

    const query = url.split('?').pop();
    const parts = query.split('&');

    return parts.reduce((p, n) => {
        let [key, value] = n.split('=');
        if (!key) return p;
        p[key] = value;
        return p;
    }, {});
};

const total = (totalPage) =>
    totalPage % limit === 0 ? totalPage / limit : Math.ceil(totalPage / limit);
const offset = (activePage) => activePage * limit - limit || 0;

const relativeURL = '/';

const getPokes = async (dispatch, p) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${p}`,
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: actionTypes.GET_POKEMON, payload: data });
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
};

const onClick = (id) => {
    window.location.href = `/${id}`;
};

const Sidebar = () => {
    const [state, dispatch] = useContext(storeContext);
    const [active, setActive] = useState(null);

    useEffect(() => {
        const { p } = getQueryParams(window.location.href);
        getPokes(dispatch, offset(+p));
        setActive(+p || 1);
    }, []);

    console.log(state);

    return (
        <div>
            {state?.results?.map((pokemon, index) => (
                <div key={index}>
                    <a href={`/${pokemon.id}`}>{pokemon.name}</a>
                </div>
            ))}
            {state?.count && (
                <Pagination
                    active={active}
                    total={total(state.count)}
                    relativeURL={relativeURL}
                />
            )}
        </div>
    );
};

export default Sidebar;
