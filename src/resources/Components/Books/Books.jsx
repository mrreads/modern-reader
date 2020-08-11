import React from 'react';
import Book from './Book/Book';
import Modal from './Modal/Modal';;

class Books extends React.Component
{
    constructor()
    {
        super();
        this.state = { show: false }
    }

    showModal = () =>
    {
        this.setState({show: !this.state.show});
    }

    render(props)
    {
        return (
        <div id="content">
            <div className="title"> 
                <p> Library </p>
                <div href="#" className="add" id="addPopup" onClick={this.showModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke="#2c3e50" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </div>

            <hr/>
            
            <div className="books">
                { this.props.data.map((book, i) => <Book data={book} key={i} /> ) }
            </div>

            <Modal show={this.state.show} onClose={() => this.showModal()} toUpdate={this.props.toUpdate} />
        </div>);
    }
}

export default Books;