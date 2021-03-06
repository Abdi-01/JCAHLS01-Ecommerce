import React from 'react'; // untuk mengaktifkan library react
import Form from '../Components/Form';
import Banner from '../Components/Banner';
/**
 * React Data Management :
 * 1️⃣. state : 
 * - untuk memanage data pada suatu component
 * - kita akan menyimpan data pada state ketika data tersebut mempengaruhi tampilan
 * 2️⃣. props : untuk mengelola data agar dapat digunakan oleh component lain, 
 *             spesifiknya mentransfer data dari parent component ke child component
 * 
 * */

// CLASS COMPONENT
// Initialize component
// let counter = 0;
class LandingPage extends React.Component {
    // Urutan render component 1️⃣ CONSTRUCTOR
    // untuk memanage data yg akan digunakan pada component react
    constructor(props) {
        console.log("1️⃣ Constructor")
        super(props);
        // local data management
        this.state = {
            counter: 0,
            input: "",
            dbStudent: []
        }
    }

    // Urutan render component 3️⃣ componentDidMount
    // untuk menjalankan fungsi pertama kali ketika component dirender
    componentDidMount() {
        console.log("3️⃣ componentDidMount")
        let dataServer = [
            {
                id: 1,
                name: "Abdi",
                class: "JC-Full Stack",
                time: "After-hour",
                job: "Product Manager",
                age: 26
            },
            {
                id: 2,
                name: "Edo",
                class: "JC-Full Stack",
                time: "After-hour",
                job: "Product Manager",
                age: 26
            },
        ]
        this.setState({ dbStudent: dataServer })
    }

    printData = () => {
        let htmlElement = this.state.dbStudent.map((value, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.class}</td>
                <td>{value.time}</td>
                <td>{value.job}</td>
            </tr>
        })

        return htmlElement
    }

    // Membuat fungsi didalam class component
    btnIncrement = () => {
        let temp = this.state.counter;
        temp++;
        this.setState({
            counter: temp
        })
        // counter++;
        // console.log(counter);
    }

    btnDecrement = () => {
        let temp = this.state.counter;
        temp--;
        this.setState({
            counter: temp
        })
        // counter--;
        // console.log(counter);
    }

    btnSubmit = () => {
        console.log(this.refs.inValue);
        this.setState({ input: this.refs.inValue.value })
    }

    handleInput = (event) => {
        console.log(event.target)
        this.setState({ input: event.target.value })
    }

    // Urutan render component 2️⃣ render()
    // mengenerate component html
    render() {
        console.log("2️⃣ Render")
        // destructering state
        const { counter, input } = this.state;
        // return html component
        return (
            <div>
                <Banner />
                <span>Value from state input :</span>
                <h4>{input}</h4>
                <button type='button' onClick={this.btnDecrement}>Decrement</button>
                <span style={{ fontSize: "24px", margin: "0px 8px" }}>
                    {counter}
                </span>
                <button type='button' onClick={this.btnIncrement}>Increment</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                </table>
                <Form
                    title="Data Form Input"
                    handleInput={this.handleInput}
                    btnSubmit={this.btnSubmit}
                />
            </div>
        )
    }
}

export default LandingPage;