import '../App.css'
import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { data } from './data';

function Game() {
    const {id} = useParams()
    const history = useHistory()

    const [questionList, setQuestionList] = useState([{'title':'title', 'questions':[{'q':'This many years ago','a':'15,000'}], 'notes':['n/a']}])
    const [questionPointer, setQuestionPointer] = useState(0)
    const [numOfQ, setNumOfQ] = useState(1)
    const [numCorrect, setNumCorrect] = useState(0)
    const [accArr, setAccArr] = useState([])

    useEffect(() => {
        makeGame()
        // eslint-disable-next-line
    }, [])

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    function makeGame(){
        let questions = data[id - 1];
        let i = 0
        let out = []
        while(i<questions.length){
        let tmp = questions[Math.floor(Math.random() * questions.length)]
        if(!out.includes(tmp)){
            out.push(tmp)
            i++
        }
        }
        out = shuffle(out)
        setQuestionList(out)
        setNumOfQ(out[0]['questions'].length)
    }

    function nextQuestion(){
        document.querySelectorAll('span').forEach(e=>e.classList = 'answer')
        document.querySelectorAll('button').forEach(e=>e.disabled = false)
        
        if(questionPointer+1 === questionList.length){
            history.push({pathname:'/end', state:[...accArr,{'title':questionList[questionPointer]["title"],'acc':(numCorrect/numOfQ)*100}]})
        }else{
            setAccArr([...accArr,{'title':questionList[questionPointer]["title"],'acc':(numCorrect/numOfQ)*100}])
            setNumOfQ(questionList[questionPointer+1]['questions'].length)
            setNumCorrect(0)
            setQuestionPointer(questionPointer+1)
        }
    }

    function qCorrect(i){
        setNumCorrect(numCorrect+1)
        document.querySelectorAll('#li'+i+' button').forEach(e=>e.disabled = true)
    }

    function qNI(i){
        setNumOfQ(numOfQ-1)
        document.querySelectorAll('#li'+i+' button').forEach(e=>e.disabled = true)
    }

    return (
        <div className="card" id="question-card">
            <h1>{questionList[questionPointer]["title"]}</h1>
            {/* <ul> */}
                {questionList[questionPointer]["questions"].map((e,i)=><p className="p-2 mb-0 fs-5 border-top border-bottom" id={'li'+i} key={i}>{e['q']}: <span onClick={()=>document.getElementById(i).classList.toggle("answer")} id={i} className="answer font-italic">{e['a']}</span><button className="btn btn-success mx-1" onClick={()=>qCorrect(i)}><i class="bi bi-check"></i></button><button className="btn btn-danger" onClick={()=>document.querySelectorAll('#li'+i+' button').forEach(e=>e.disabled = true)}><i class="bi bi-x"></i></button><button className="mx-1 btn btn-warning" onClick={()=>qNI(i)}>Not Imp.</button></p>)}
            {/* </ul> */}
            <h5>Notes:</h5>
            <ul>
                {questionList[questionPointer]["notes"].map((e,i)=><li className="fs-6" key={i}>{e}</li>)}
            </ul>
            <h5 className="mt-2">Score: {(numCorrect/numOfQ)*100}%</h5>
            <button id="btn-next" className="btn btn-primary" onClick={nextQuestion}>Next</button>
        </div>
    );
}

  export default Game;