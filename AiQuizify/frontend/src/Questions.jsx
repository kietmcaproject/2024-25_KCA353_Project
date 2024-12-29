import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from './database/data.js'
import { useFetchQestion } from './hooks/FetchQuestion.js';
import { updateResult } from './hooks/setResult.js';

export function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  const questions = useSelector(state => state.questions.queue[state.questions.trace])
   const dispatch = useDispatch();


   useEffect(() => {
    dispatch(updateResult({ trace, checked}))
}, [checked])

function onSelect(i){
    onChecked(i)
    setChecked(i)
    dispatch(updateResult({ trace, checked}))
}


if(isLoading) return <h3 className='text-light'>isLoading</h3>
if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>{questions?.question}</h2>
      <ul className='mb-4'>
        {
        questions?.options.map((q, i) => (
          <li key={i}>
              <input 
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onSelect(i)}
              />

              <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
              <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
          </li>
      ))
        }
      </ul>
    </div>
  );
}
export default Questions;