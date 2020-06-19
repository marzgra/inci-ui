import React from 'react';
import {API_URL} from "../../config";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import Select from "react-select";
import {handleResponse} from "../../helpers";
import './AddForm.css';


export default class AddForm extends React.Component {
    constructor(props) {
        console.log(props);
        const {inciName, inci, isEditMode} = props.location.state;
        super(props);
        this.state = {
            inci: inci,
            name: isEditMode ? inci.inciName : inciName,
            description: isEditMode ? inci.description : '',
            functions: isEditMode ? inci.functionNames : [],
            selectedFunctions: [],
            functionsToSave: [],
            alternativeNames: isEditMode ? inci.alternativeNames : [],
            polishNames: isEditMode ? inci.polishNames : [],
            redirect: false,
            isEditMode: isEditMode,
            id: isEditMode ? inci.inciId : 0
        };
    }

    componentWillMount() {
        fetch(`${API_URL}/functions/all`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(handleResponse)
            .then((result) => {
                this.setState({functions: result});
            });

    }

    handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        this.setState({[inputName]: inputValue});
    };


    handleSubmit = () => {
        fetch(this.state.isEditMode ? `${API_URL}/ingredients/edit` : `${API_URL}/ingredients/add`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: this.state.isEditMode ? "PUT" : "POST",
            body: JSON.stringify({
                inciId: this.state.id,
                inciName: this.state.name,
                description: this.state.description,
                functionNames: this.state.functionsToSave,
                polishNames: this.state.polishNames,
                alternativeNames: this.state.alternativeNames,
            })
        })
            .then(handleResponse)
            .then((result) => {
                this.setState({
                    redirect: true,
                    id: result
                });
            })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            this.props.history.push(`/ingredients/id/${this.state.id}`)
        }
    };

    handleChangeFunctions = (selectedFunctions) => {
        let functions = selectedFunctions.map(selected => selected.fun);
        this.setState({
            functionsToSave: functions,
            selectedFunctions: selectedFunctions
        });
    };

    handleInputChangeText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
                .split(",")
                .map(function (item) {
                    return item
                        .trim()
                        .toLowerCase();
                })
        })
    };

    render() {
        const {functions, selectedFunctions, name, inci, isEditMode} = this.state;
        return (
            <div className="add-form">
                <Form className='container'>
                    <FormGroup>
                        <Label className="form-label" for="inciName">Nazwa: </Label>
                        <Input className="form-small-input" type="text" name="name" placeholder="Nazwa" defaultValue={isEditMode ? inci.inciName: name}
                               onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" for="inciDescription">Opis: </Label>
                        <Input className="form-big-input" type="textarea" name="description" placeholder="Opis" defaultValue={isEditMode ? inci.description : " "}
                               onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" for="Surname">Nazwy polskie: </Label>
                        <Input className="form-big-input" type="textarea" name="polishNames" placeholder="Nazwy polskie" defaultValue={isEditMode ? inci.polishNames : " "}
                               onChange={this.handleInputChangeText}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" for="Surname">Nazwy alternatywne: </Label>
                        <Input className="form-big-input" type="textarea" name="alternativeNames" defaultValue={isEditMode ? inci.alternativeNames : " "}
                               placeholder="Nazwy alternatywne" onChange={this.handleInputChangeText}/>
                    </FormGroup>
                    <Label className="form-label" for="functions">Funkcje: </Label>
                    <Select
                        className="select"
                        defaultValue={isEditMode ? inci.functionNames.map((func, index) => {
                            return {
                                label: func.functionName,
                                value: func.functionName,
                                key: index,
                                fun: func
                            }
                        }) : selectedFunctions}
                        onChange={this.handleChangeFunctions}
                        options={
                            functions.map((func, index) => {
                                return {
                                    label: func.functionName,
                                    value: func.functionName,
                                    key: index,
                                    fun: func
                                }
                            })
                        }
                        isMulti
                    />
                    <br/>
                    <Button onClick={this.handleSubmit}>Zapisz</Button>
                    {this.renderRedirect()}

                </Form>

            </div>
        );
    }
}