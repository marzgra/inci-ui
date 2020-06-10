import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './Table.css'

const Table = (props) => {
    const { history, ingredients } = props;

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                <tr>
                    <th>Nazwa</th>
                </tr>
                </thead>
                <tbody className="Table-body">
                {ingredients.map(inci =>
                    <tr
                        key={inci.inciName}
                        onClick={() => history.push(`/ingredients/id/${inci.inciId}`)}
                    >
                        <td>
                            {inci.inciName}
                        </td>

                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    ingredients: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(Table);