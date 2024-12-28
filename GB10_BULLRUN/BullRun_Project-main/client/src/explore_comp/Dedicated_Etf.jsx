import { useState, useEffect } from "react";
import axios from 'axios';
import Loading_Spinner from '../../components/Loading_Spinner';
import './explore_comp.css';

const Dedicated_Etf = () => {
    const API = "https://financialmodelingprep.com/api/v3/stock/list?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
    const API2 = "https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
    const [EtfData, setEtfData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [TopByMarketCap, setTopByMarketCap] = useState([]);
    const [TopByVolume, setTopByVolume] = useState([]);
    const [TopGainer, setTopGainer] = useState([]);
    const [TopLosser, setTopLosser] = useState([]);


    const getEtfData = async () => {
        try{

        
        const res = await axios.get(API);
        const res2 = await axios.get(API2);
        const etf_filt = res.data.filter((et) => {
            return et.exchangeShortName === 'NASDAQ' && et.type === 'etf'
        })
        const res_etf = [];
        res2.data.forEach(item2 => {
            const match = etf_filt.find(item1 => item1.symbol === item2.symbol);
            if (match) {
                res_etf.push(item2);
            }
        })
        // console.log(res_etf);
        const high_mar_cap_etf = [...res_etf].sort((a, b) => b.marketCap - a.marketCap);
        const high_volume_etf = [...res_etf].sort((a, b) => b.avgVolume - a.avgVolume);
        const top_perform = [...res_etf].sort((a, b) => b.changesPercentage - a.changesPercentage);
        const less_perform = [...res_etf].sort((a, b) => a.changesPercentage - b.changesPercentage);
        setTopByMarketCap(high_mar_cap_etf);
        setTopByVolume(high_volume_etf);
        setTopGainer(top_perform);
        setTopLosser(less_perform);
        setLoading(false);
        }catch(err){
            console.log(arr);   
        }
    }
    useEffect(() => {
        getEtfData();
    }, [])
    return (
        <>
            {
                Loading ?
                    <Loading_Spinner />
                    :
                    <>
                        <h1>High MarketCap</h1>
                        <div>
                            {TopByMarketCap.map((et, index) => (
                                <h1 key={index}>{et.symbol}</h1>
                            ))}
                        </div>
                        <h1>High Volume</h1>
                        <div>
                            {TopByVolume.map((et, index) => (
                                <h1 key={index}>{et.symbol}</h1>
                            ))}
                        </div>
                        <h1>Top Gainer</h1>
                        <div>
                            {TopGainer.map((et, index) => (
                                <h1 key={index}>{et.symbol}</h1>
                            ))}
                        </div>
                        <h1>Top Losser</h1>
                        <div>
                            {TopLosser.map((et, index) => (
                                <h1 key={index}>{et.symbol}</h1>
                            ))}
                        </div>
                        
                        
                        
                        
                    </>
            }
        </>
    )
}
export default Dedicated_Etf;