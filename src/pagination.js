import React from 'react';

const LEFT = 'L';
const RIGHT = 'R';
const ELLIPSIS = 'E';

const PaginationClick = {
    LEFT: 'left',
    RIGHT: 'right',
    PREV: 'prev',
    NEXT: 'next',
};

const PageNeighbours = 2;
const MinVisiblePages = 5;

const range = (start, end) => new Array(end - start + 1).fill(null).map((d, i) => i + start);


const url = (path, overrideQuery, decode = true) => {
    const [pathname, search] = [...path.split('?', 3)];

    const params = search ? search
        .split('&')
        .map(c => c.split('='))
        .reduce((obj, pair) => ({...obj, [pair[0]]: decode ? decodeURIComponent(pair[1]) : pair[1] }), {}) : {};

    Object.keys(overrideQuery || []).map(k => params[k] = overrideQuery[k]);

    const newQuery = Object.keys(params)
        .filter(k => params[k] !== null)
        .map(k => `${k}=${params[k]}`)
        .join('&');

    return `${pathname}${newQuery ? `?${newQuery}` : ''}`;
};

const Pagination = ({ active, total, relativeURL, onChange }) => {

    const [pages, setPages] = React.useState([]);

    const handleOnClick = (e, page, direction) => {
        // istanbul ignore next
        !relativeURL && e.preventDefault();
        onChange && onChange(page, direction);
    };

    React.useEffect(() => {

        let startPage = Math.max(1, active - PageNeighbours);
        let endPage = Math.min(total, active + PageNeighbours);

        if (startPage > total - MinVisiblePages) {
            startPage = Math.max(1, total - MinVisiblePages + 1);
        }

        if (endPage < MinVisiblePages && MinVisiblePages < total) {
            endPage = MinVisiblePages;
        }

        const extraLeft = startPage !== 1 ? [1, ELLIPSIS] : [];
        const extraRight = endPage !== total ? [ELLIPSIS, total] : [];

        setPages([LEFT, ...extraLeft, ...range(startPage, endPage), ...extraRight, RIGHT]);

    }, [active, total]);

    return total && total > 1 && (
        <div>
            {pages.map((page, index) => {
                switch (page) {
                    case LEFT:
                        return (
                            // eslint-disable-next-line jsx-a11y/anchor-has-content
                            <a
                                key={index}
                                href={relativeURL && url(relativeURL, {
                                    p: active > 2 ? active - 1 : null,
                                })}
                                onClick={(e) => handleOnClick(e, active - 1, PaginationClick.LEFT)}
                            />
                        );
                    case RIGHT:
                        return (
                            // eslint-disable-next-line jsx-a11y/anchor-has-content
                            <a
                                key={index}
                                href={relativeURL && url(relativeURL, { p: active + 1 })}
                                onClick={(e) => handleOnClick(e, active + 1, PaginationClick.RIGHT)}
                            />
                        );
                    case ELLIPSIS:
                        return (
                            <span key={index} >
                                &hellip;
                            </span>
                        );
                    default:
                        return (
                            <a
                                key={index}
                                href={relativeURL && url(relativeURL, { p: page > 1 ? page : null })}
                                onClick={(e) => handleOnClick(e, page, active > page ? PaginationClick.PREV : PaginationClick.NEXT)}
                            >
                                {page}
                            </a>
                        );
                }
            })}
        </div>
    )
}


export default Pagination;
export { PaginationClick };
