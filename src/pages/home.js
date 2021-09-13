import '../App.css'
import { Link} from "react-router-dom";


function Home() {
    return (
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">APUSH Game</h5>
            <p className="card-text">A quiz over the APUSH key ideas</p>
            <div className="d-flex flex-column">
                <Link to='/game/1'><button className="btn btn-primary mb-2">Chapter 1</button></Link>
                <Link to='/game/2'><button disabled="true" className="btn btn-primary mb-2">Chapter 2</button></Link>
                <Link to='/game/3'><button disabled="true" className="btn btn-primary mb-2">Chapter 3 (1-4)</button></Link>
            </div>
            </div>
        </div>
    );
}

  export default Home;