import React from 'react';

export const handleResponse = (response) => {
    console.log(response);
    return response.json().then(json => {
        console.log("json: " + json);
        return json;
    });
};

export const renderChangePercent = (changePercent) => {
    if (changePercent > 0) {
        return <span className="percent-raised">{changePercent}% &uarr;</span>
    } else if (changePercent < 0) {
        return <span className="percent-fallen">{changePercent}% &darr;</span>
    } else {
        return <span>{changePercent}</span>
    }
};