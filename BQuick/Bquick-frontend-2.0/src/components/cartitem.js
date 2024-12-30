import React from 'react';
import { FcDeleteDatabase } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { remove } from '../redux/slice/cartslice';

function Cartitem({ item, itemindex }) {
  const dispatch = useDispatch();

  // Function to remove item from cart
  const removefromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-5 justify-between mt-2 mb-2 mx-5 border-b-2 border-slate-500">
      <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
        <div className="w-full md:w-[30%]">
          <img src={item.image} alt="item-image" className="object-cover w-full rounded-md" />
        </div>

        <div className="w-full md:w-[70%] mt-4 md:mt-0">
          <h1 className="text-xl text-slate-700 font-semibold">{item.name}</h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
            <p className="text-green-600 font-bold text-lg">Rs {item.price}</p>
            <button
              onClick={removefromCart}
              className="text-red-800 bg-red-200 hover:bg-red-400 transition duration-300 cursor-pointer rounded-full p-2"
            >
              <FcDeleteDatabase size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitem;
