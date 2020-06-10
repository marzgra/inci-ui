import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import './MyListGroup.css'

const MyListGroup = (props) => {
    const {functions} = props;
    return (
        <ListGroup >
            {functions.map(fun =>
                <ListGroupItem className="listElement">{fun}</ListGroupItem>
            )}
        </ListGroup>
    );

};

export default MyListGroup;