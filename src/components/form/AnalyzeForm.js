import React from 'react';
import {API_URL} from "../../config";
import {handleResponse} from "../../helpers";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import './AnalyzeForm.css';
import InciCard from "../inciCard/InciCard";


export default class AnalyzeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            result: [],
            loaded: false,

        };
    }

    componentWillMount() {

    }

    prepareIngredientsList = () => {
        return this.state.ingredients.join();
    };

    handleInputChange = (e) => {
        this.setState({
            ingredients: e.target.value
                .split(",")
                .map(function (item) {
                    return item
                        .trim()
                        .toLowerCase();
                })
        })
    };

    handleSubmit = () => {
        fetch(`${API_URL}/analyze?list=${this.prepareIngredientsList()}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    result: data,
                    loaded: true
                });
            });
    };

    render() {
        const {loaded, result} = this.state;
        return (
            <div className="analyze-form">
                <h1 className="heading">
                    Podaj składniki do analizy
                </h1>

                <div className='container'>
                    <Form>
                        <FormGroup>
                            <Label className="form-label" for="ingredients-label">Składniki: </Label>
                            <br/>
                            <Input className="form-input" name="ingredients" type="textarea"
                                   onChange={this.handleInputChange}/>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} className="btn">Analizuj</Button>
                    </Form>
                </div>

                {
                    loaded && result.map(inci =>
                        <InciCard inci={inci}/>
                    )}

            </div>
        );
    }


}