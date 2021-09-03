import React from 'react';
import axios from 'axios';

class Notes extends React.Component {
    //State of application component
    state = {
        notes: [],
        error: null,
    };

    // Fetch of notes immediately after the component is mounted
    componentDidMount = async () => {
        try {
            const response =await axios.get('https://strapi.naoroy.dev/');
            this.setState({ notes: response.data });
        } catch (error) {
            this.setState({ error });
        }
    };
    render() {
        const {error} = this.state;

        // Print errors if analytics
        if (error) {
            return <div> An error occured: {error.message}</div>;
        }

        return (
            <div className="Notes">
                <ul>
                    {this.states.notes.map(note => (
                            <li key={note.id}>{note.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Notes;