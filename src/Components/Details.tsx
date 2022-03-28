import React from 'react';
import { useLocation } from 'react-router-dom';
import { PostsDataInterface } from '../types/index.t';

const Details = () => {
    const {state} = useLocation();
    const post = state as PostsDataInterface;

    return (
        <div data-testis="detailsPosts">
            <pre data-testid="postDetails">
                {
                    JSON.stringify(post, null, 2)
                }
            </pre>
        </div>
    );
};

export default Details;