import React, { useState, useRef, useEffect } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';


const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  // let question = data[index];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setResult(false);
    setScore(0);
  }

  return (
    <div className='container'>
      <h1>Aptitude Quiz</h1>
      <hr />
      {result ? <></> : <><h2 className="no-select">{index + 1}.{question.question}</h2>
        <ul>
          <li className="no-select" ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
          <li className="no-select" ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
          <li className="no-select" ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
          <li className="no-select" ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index + 1} of {data.length} questions</div></>}
      {result ? <><h2>Your Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></> : <></>}
      <div className="creator-badge">
        Create and build this app <strong>Vivek Vara</strong>
      </div>
    </div>
  )
}

export default Quiz