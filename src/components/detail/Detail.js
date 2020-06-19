import React from 'react';
import {API_URL} from '../../config';
import {handleResponse} from '../../helpers.js';
import Loading from '../common/loading/Loading';
import './Detail.css';
import MyListGroup from "../common/list/MyListGroup";
import {Link} from "react-router-dom";

function Button (props) {
    // const {inci} = props.inci;
    return <Link className='btn-link' to={{
        pathname: `/ingredients/edit`,
        state: {
            inci: props.inci,
            isEditMode: true
        }
    }}>Edytuj</Link>
}

export default class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredient: {},
            error: '',
            loading: false,
        }
    }

    componentWillMount() {
        const inciId = this.props.match.params.id;

        this.fetchCurrency(inciId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const inciId = nextProps.match.params.id;

            this.fetchCurrency(inciId);
        }
    }

    fetchCurrency(inciId) {
        this.setState({loading: true});

        fetch(`${API_URL}/ingredients/id/${inciId}`)
            .then(handleResponse)
            .then((ingredient) => {
                this.setState({
                    ingredient,
                    error: '',
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                });
            });
    }

    render() {
        const {ingredient, loading, error} = this.state;

        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }

        // Render only error message, if error occured while fetching data
        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    {ingredient.inciName.toUpperCase()}
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        <span className="Detail-title">Nazwa</span>
                        <span className="Detail-value">{ingredient.inciName}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Opis</span>
                        <span className="Detail-description">{ingredient.description}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Funkcje</span>
                        <MyListGroup functions={ingredient.functionNames.map(fun => fun.functionName)}/>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Polskie nazwy</span>
                        <MyListGroup functions={ingredient.polishNames}/>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Inne nazwy</span>
                        <MyListGroup functions={ingredient.alternativeNames}/>
                    </div>
                    <Button inci={ingredient}/>
                </div>

            </div>
        );
    }
}