import React from 'react';
import {handleResponse} from "../../../helpers";
import Loading from '../loading/Loading';
import Table from '../table/Table';
import Pagination from '../pagination/Pagination';
import {API_URL} from "../../../config";


class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            loading: false,
            error: '',
            page: 1,
            totalPages: 0,
            perPage: 20,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);

    }

    componentWillMount() {
        this.fetchIngredients();
    }

    fetchIngredients() {
        const { page, perPage } = this.state;

        this.setState({ loading: true });

        fetch(`${API_URL}/ingredients?page=${page}&perPage=${perPage}`)
            .then(handleResponse)
            .then((data) => {
                const { ingredients, totalPages, page, perPage} = data;
                this.setState({
                    ingredients,
                    totalPages,
                    page,
                    perPage,
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

    handlePaginationClick(direction) {
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {
            this.fetchIngredients();
        });
    }

    render() {
        const { ingredients, loading, error, totalPages, page } = this.state;

        // Render only loading component, if it's set to true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        // Render only error message, if error occurred while fetching data
        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table ingredients={ingredients} />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>

        );
    }
}

export default List;