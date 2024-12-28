// const Button = ({ text,color }: { text: string,color: string }) => {
//   return <button className= `text-white bg-${color} py-2 px-3 rounded-lg cursor-pointer` >{text}</button>;
// };

// export default Button;


const Button = ({ text, color }: { text: string; color: string }) => {
  return (
    <button
      className={`text-white py-2 px-3 rounded-lg cursor-pointer`}
      style={{ backgroundColor: color }} // Use inline styles for dynamic colors
      onClick={() => window.location.href = `/user/${text}`}
    >
      {text}
    </button>
  );
};

export default Button;
