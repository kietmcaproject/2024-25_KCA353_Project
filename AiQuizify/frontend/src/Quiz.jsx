import React, { useEffect, useState } from 'react';
import { MoveNextQuestion, MovePrevQuestion } from './hooks/FetchQuestion.js';
import { PushAnswer } from './hooks/setResult.js';
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Questions from './Questions.jsx';

const Quiz = () => {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() =>{
    console.log(result);
  })

  function onNext() {
    if (trace < queue.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      /** insert a new result in the array.  */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
  }
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/Score'} replace={true}></Navigate>
}

  return (
    <div className="w-screen flex justify-center bg-slate-100 items-center h-screen">
      <div className="flex flex-col w-3/4 h-[500px] text-white p-16 rounded-r-3xl bg-[#3c003e] gap-3 ml-6 text-xl">
        <h1 className="text-2xl font-bold">Question 1 : </h1>

        <Questions onChecked={onChecked} />
        <div className="flex gap-4">
          {trace > 0 ? (
            <button
              className="bg-white hover:text-[#3c003e] hover:scale-105 transition-transform duration-150 text-black p-2 w-32 text-lg font-bold rounded-2xl"
              onClick={onPrev}
            >
              Prev
            </button>
          ) : null}
          <button
            className="bg-white hover:text-[#3c003e] hover:scale-105 transition-transform duration-150 text-black p-2 w-32 text-lg font-bold rounded-2xl"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
