import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import MyListGroup from "../common/list/MyListGroup";

const InciCard = (props) => {
    const { inci } = props;
    console.log("in inci card: " + inci);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>{inci.inciName}</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <div className="description">{inci.description}</div>
                        <MyListGroup functions={inci.functionNames.map(fun => fun.functionName)}/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};

export default InciCard;