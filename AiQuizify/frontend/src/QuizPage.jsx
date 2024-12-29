import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4002/api/quiz/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4002/api/quiz/submit', { answers });
      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    
    // <div>
    //   <h1>AI-Based Quiz</h1>
    //   <h2>Score: {score}</h2>
    //   {questions.map((question, index) => (
    //     <div key={index}>
    //       <p>{question.questionText}</p>
    //       {question.options.map((option, idx) => (
    //         <button
    //           key={idx}
    //           onClick={() => setAnswers(prev => {
    //             const newAnswers = [...prev];
    //             newAnswers[index] = option.text;
    //             return newAnswers;
    //           })}
    //         >
    //           {option.text}
    //         </button>
    //       ))}
    //     </div>
    //   ))}
    //   <button onClick={handleAnswerSubmit}>Submit Answers</button>
    // </div>
    <div className='w-screen flex justify-center bg-slate-100 items-center h-screen'>
      <div className='w-3/4 h-[500px] text-white  p-16 flex rounded-r-3xl bg-[#3c003e]'> 
      <div className='gap-10 flex  flex-col'>
      <h1 className='text-2xl font-bold'>Question 1 : </h1>
     
     <h1 className='text-xl'>What will be the output of the following code?
    
    <div className='text-black text-2xl italic p-3 mt-4 bg-white'> console.log(0.1 + 0.2 === 0.3); </div>

</h1>
<div className="flex flex-col gap-3 ml-6 text-xl">
  <label class="flex items-center">
    <input type="radio" name="ans" />
    <span class="ml-2">True</span>
  </label>
  <label class="flex items-center">
    <input type="radio" name="ans"/>
    <span class="ml-2">False</span>
  </label>
  <label class="flex items-center">
    <input type="radio" name="ans"/>
    <span class="ml-2">0.3</span>
  </label>
  <label class="flex items-center ">
    
    <input type="radio" name="ans" />
    <span class="ml-2">Undefine</span>
    

  </label>
  
    <div className='flex gap-12 mt-2'>
<button className='bg-white hover:text-[#3c003e] hover:scale-105 transition-transform duration-150 text-black p-2 w-32 text-lg font-bold rounded-2xl'>Check Ans</button>
<button className='bg-white hover:text-[#3c003e] hover:scale-105 transition-transform duration-150 text-black p-2 w-32 text-lg font-bold rounded-2xl'>Prev</button>
<button className='bg-white hover:text-[#3c003e] hover:scale-105 transition-transform duration-150 text-black p-2 w-32 text-lg font-bold rounded-2xl'>Next</button>
</div>
</div>

</div>
      </div>
      </div>
  );
}

export default QuizPage;
