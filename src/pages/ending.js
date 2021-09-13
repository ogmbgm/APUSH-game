import '../App.css'
import {useLocation, Link} from 'react-router-dom';

function Ending() {
    const { state } = useLocation();
    return (
        <div>
            <h1>End of Chapter</h1>
            <h3>Scores:</h3>
            <ul>
                {state.map((e,i)=><li key={i}>{e['title']}: {e['acc']}%</li>)}
            </ul>
            <Link to="/"><button>Home</button></Link>
        </div>
    );
}

  export default Ending;