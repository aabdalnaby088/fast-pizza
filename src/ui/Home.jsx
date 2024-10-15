import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser.jsx";
import Button from "./Button.jsx";

function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-10 text-center">
      <h1 className="text-xl text-stone-700 font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>
      { userName == '' ?  <CreateUser/> : <Button type='primary' to='/menu'>Continue ordering, {userName}</Button>}
    </div>
  );
}

export default Home;
