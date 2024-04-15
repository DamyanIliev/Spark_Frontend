import React, { useState, useEffect } from 'react';
import { CoinGecko } from '../../utils/gecko';
import TrendingCard from './TrendingCard'; // Import the TrendingCard component

const Trending = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await CoinGecko(); 
            setResponse(res.coins); 
        };

        fetchData();
    }, []);

    console.log(response);

    return (
        <div className='w-full bg-oxford-blue-900 shadow-sm rounded-lg px-6 py-5'>
            <p className='text-white mb-2'>Top Trending Cryptocurrencies Today</p>
            <div className="grid grid-cols-2 gap-4">
                {Array.isArray(response) && response.slice(0, 6).map((item, index) => (
                    <TrendingCard key={item.coin_id} data={item} />
                ))}
            </div>
        </div>
    );
}
 
export default Trending;