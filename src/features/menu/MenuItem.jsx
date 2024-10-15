import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { addProduct, getCurrentQuantityById } from "../cart/cartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemsQuantity from "../cart/updateItemsQuantity.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id)); 
function handleClick(){  
  
  const newPizza = {
    pizzaId: id,
    name,
    quantity: 1,
    unitPrice,
    totalPrice: unitPrice,
  } 
  if(currentQuantity) return
dispatch(addProduct(newPizza));
}


  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={` ${soldOut? 'opacity-70 grayscale' : ''} h-24`} />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {currentQuantity? <div className="flex items-center justify-center gap-3">
            <UpdateItemsQuantity id={id}/>
            <DeleteItem pizzaId={id} />
          </div> : 
          !soldOut && <Button onClick={handleClick} disabled={soldOut} type = 'small'>
              Buy Now
            </Button>
          
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
