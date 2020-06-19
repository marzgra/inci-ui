import React from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap';
import MyListGroup from "../common/list/MyListGroup";
import './InciCard.css';
import {Link} from "react-router-dom";

const InciCard = (props) => {
    const {inci} = props;

    function Button(props) {
        const inci = props.inci;
        if (/not found: */.test(inci.inciName)) {
            let name = inci.inciName.substring(11);
            return <Link className='btn-link' to={{
                pathname: `/ingredients/add`,
                state: {
                    inciName: name
                }
            }}>Dodaj</Link>
        }
        return <Link className='btn-link' to={{
            pathname: `/ingredients/edit`,
            state: {
                inci: inci,
                isEditMode: true
            }
        }}>Edytuj</Link>
    }

    function concatLists(list1, list2) {
        return list1.concat(list2);
    }

    return (
        <div className="container">
            <Card className="card">
                <CardTitle className="title">{inci.inciName}</CardTitle>
                {inci.inciId != null &&
                <CardBody>
                    <div className="description">{inci.description}</div>
                    <div>Funkcje:</div>
                    <MyListGroup functions={inci.functionNames.map(fun => fun.functionName)}/>
                    <div>Inne nazwy:</div>
                    <MyListGroup functions={concatLists(inci.polishNames, inci.alternativeNames)}/>

                </CardBody>
                }
                <Button inci={inci}/>
            </Card>
        </div>
    );
};

export default InciCard;