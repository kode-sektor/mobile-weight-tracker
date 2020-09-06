import React from 'react';

const Capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { Capitalise };