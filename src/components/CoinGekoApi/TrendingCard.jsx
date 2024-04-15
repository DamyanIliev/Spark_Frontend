import React from 'react';

const TrendingCard = ({ data }) => {
    const formattedPrice = parseFloat(data.item.data.price).toFixed(4);

    // Construct the CoinGecko URL for the coin
    const coinGeckoUrl = `https://www.coingecko.com/en/coins/${data.item.id}`;

    return (
        <a href={coinGeckoUrl} target="_blank" rel="noopener noreferrer" className="text-white no-underline">
            <div className=' bg-oxford-blue-950 shadow-sm rounded-lg p-4'>
                <img src={data.item.small} alt={data.item.name} className="w-10 h-10 rounded-full mb-4" />
                <h1 className='text-sm font-semibold text-white8'>{data.item.name}</h1>
                <p className='text-white8'>{formattedPrice} USD</p>
            </div>
        </a>
    );
}

export default TrendingCard;