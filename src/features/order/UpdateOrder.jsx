import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button.jsx'
import { updateOrder } from '../../services/apiRestaurant.js';

export default function UpdateOrder({order}) {
    const fetcher = useFetcher(); 
    function handleClick(){

    }
    return (
        <fetcher.Form method='PATCH' className='text-right'>
            <Button onClick={handleClick} type={'primary'}>Make Priority</Button>
        </fetcher.Form>
    )
}

export async function action({request, params}){
    const data = {priority: true}
    await updateOrder(params.orderId, data)
return null; 

}