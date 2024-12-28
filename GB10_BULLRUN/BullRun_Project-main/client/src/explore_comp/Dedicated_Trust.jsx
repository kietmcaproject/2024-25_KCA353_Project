import { useState, useEffect } from "react";
import axios from 'axios';
import Loading_Spinner from '../../components/Loading_Spinner';
import './explore_comp.css';
const Dedicated_Trust = ()=>{
    const API = "https://financialmodelingprep.com/api/v3/stock/list?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
    const API2 = "https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
   const [Loading,setLoading] = useState(true);
   const [Trust,setTrust] = useState([]);
   const getTrustData=async()=>{
        try{

            const res = await axios.get(API);
            const res2 = await axios.get(API2);
            const trust_filt = res.data.filter((tr)=>{
                return tr.exchangeShortName === 'NASDAQ' && tr.type === 'trust'
            })
            const res_trust=[];
            res2.data.forEach(item2 => {
                const match = trust_filt.find(item1 => item1.symbol === item2.symbol);
                if (match) {
                    res_trust.push(item2);
                }
            })
            setTrust(res_trust);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
             getTrustData();
    },[])
    return (
        <>{
            Loading?
            <Loading_Spinner/>
            :
            <>
            <h1>NASDAQ Trust's</h1>
            <div>
                {
                    Trust.map((tr,index)=>(
                        <h1 key={index}>{tr.symbol}</h1>
                    ))
                }
            </div>
            </>
        }

        </>
    )
}
export default Dedicated_Trust;