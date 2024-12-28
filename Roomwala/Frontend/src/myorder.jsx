import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOST}/api/v1/order/getorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    data.orders.reverse();
                    setOrders(data.orders);
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
        , []);


    const convertUnixToIST = (unix) => {
        let unix1 = parseInt(unix);
        const date = new Date(unix1);
        return date.toLocaleString();
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-gray-800 mt-6">My Orders</h1>
            <main className="mt-6 w-full sm:w-2/3">
                <div className="bg-white p-6 rounded shadow-md">
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            You have <span className='font-bold text-orange-400'>{orders.length}</span>  orders
                        </p>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount (₹)
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.orderid}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.orderid}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {convertUnixToIST(order.orderid)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.paymentstatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    

                </div>
            </main>
            <div className="mt-6">
                <p className="text-sm text-gray-500">
                   Note: Payment Status generally takes 5-10 minutes to update after payment is success. If you have any queries, please contact us at <a href="tel:+919798305771" className="text-blue-500 hover:underline">
                       9798305771 </a>
                </p>
                <NavLink href="#" className="text-blue-500 hover:underline">Term and Conditions</NavLink>
                </div>
        </div>
    );
};

export default MyOrdersPage;
