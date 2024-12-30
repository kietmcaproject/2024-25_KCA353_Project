import React from 'react'
import { useSelector ,useDispatch} from "react-redux";
import { toast } from 'react-hot-toast';
import{add,remove} from '../redux/slice/cartslice'


function ItemListCard({item}) {


    // --------------to access initial state we use name of slice-----------------
    const { cart } = useSelector((state) => state);
   const dispatch=useDispatch();


//    ------------------add-to-cart-option----------------
   const addtocart=()=>
   {
    dispatch(add(item));
    toast.success("Item added to cart")

   }

//    -------------------remove-to-cart-option------------------
   const removeFromcart=()=>
   {
    dispatch(remove(item.id))
    toast.error("Item removed from cart")

   }
  return (
    <div
    className='flex flex-col items-center justify-between 
    hover:scale-110 transitio-all duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline-gray-500
shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_#00000024] '
    >
        <div
        
        >
            <p
            className='text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1'
            >{item.name}</p>
        </div>
        <div
        className='h-[180px]'
        >
            <img src={item.image} alt='item-image'
            className='h-full w-full'
            />
        </div>
        <div
        className='flex justify-between gap-2'>

        <div>
         <p
         className='text-green-600 font-semibold items0cenetr m-5'
         >Rs{item.price}</p>
        </div>
       
    {
        // ---------------id ko remove kar do cart se--------------------
        cart.some((p)=>p.id===item.id)?
        (<button
        className=' mt-2 w-38 h-12 border-2 border-gray-700 text-gray-700 uppercase font-semibold 
        px-3 py-1 rounded-full  text-[12px] transition-all
         duration-300 ease-in hover:text-white
          hover:bg-gray-700'
        onClick={removeFromcart}
        >Remove Item</button>):

        // -----------------id ko add kard cart me----------------
        (<button
            className='mt-2 w-38 h-12 border-2 border-gray-700 text-gray-700 uppercase font-semibold 
            px-3 py-1 rounded-full  text-[12px] transition-all
             duration-300 ease-in hover:text-white
              hover:bg-gray-700'
        onClick={addtocart}
        >Add to Cart</button>)
    }
     
        </div>
      
    </div>
  );
}

export default ItemListCard;