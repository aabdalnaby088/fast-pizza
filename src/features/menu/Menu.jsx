import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant.js";
import MenuItem from "./MenuItem.jsx";

function Menu() {

  const menu = useLoaderData();
  return <ul className="divide-y divide-stone-200 px-2">
    {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/> )}
  </ul>
  return <h1>Menu</h1>;
}


export async function Loader(){
  const menu = await getMenu();
  return menu;
}

export default Menu;
