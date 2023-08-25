import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function CoinDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        async function fetchCoinData() {
            if (id) {
                const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${id}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setCoin(data[0]);
                }
            }
        }
        fetchCoinData();
    }, [id]);

    return (
        <div className='coin-detail'>
            {coin ? (
                <div>
                    <div className='name-symbol'>
                        <h1 className='name'>coin-name</h1>
                        <h2 className='symbol'>(coin-symbol)</h2>
                    </div>
                    <div className='market-description'>
                        <p className='coin-rank'>Rank:coin-symbol</p>
                        <p className='coin-price'>Price:$coin-price_usd</p>
                        <p className='coin-market-cap'>Market Cap: $coin-market_cap_usd</p>
                        <p className='coin-total-supply'>Total Supply:coin-tsupply</p>
                        <p className='coin-max-supply'>Max Supply:coin-msupply || 'N/A'</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CoinDetail;
