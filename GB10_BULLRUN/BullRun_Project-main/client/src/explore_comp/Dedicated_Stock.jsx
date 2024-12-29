import { useState,useEffect } from "react";
import axios from 'axios';
import Loading_Spinner from '../../components/Loading_Spinner';
import './explore_comp.css';

const Dedicated_Stock = ()=>{
    const API = "https://financialmodelingprep.com/api/v3/stock/list?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
    const API2 = "https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=POx9PiDc9nnBzmbrjUtIVbmvLECjGQ45";
    const [Mid_Cap, setMidCapData] = useState([]);
    const [Lar_Cap, setLarCapData] = useState([]);
    const [Sma_Cap, setSmaCapData] = useState([]);
    const [Gainer,setGainer] = useState([]);
    const [Looser,setLooser] = useState([]);
    
    const [Loading,setLoading] = useState(true);
    const getStockData=async()=>{
         const res = await axios.get(API);
         const res2 = await axios.get(API2);
         const st_filt = res.data.filter((st)=>{
            return st.exchangeShortName === 'NASDAQ' && st.type === 'stock'
         })
         const res_stock =[];
         res2.data.forEach(item2=>{
            const match = st_filt.find(item1=> item1.symbol===item2.symbol);
            if(match){
                res_stock.push(item2);
            } 
        })
        // console.log(res_stock);
        const lar = [];
        const small = [];
        const mid = [];
        const gain = [];
        const loss = [];
        res_stock.forEach(it=>{
            if(it.marketCap<2000000000){
                small.push(it);
            }
            if(it.marketCap>=2000000000 && it.marketCap<10000000000){
                mid.push(it);
            }
            if(it.marketCap>=10000000000){
                lar.push(it);
            }
            
        })
        lar.forEach(it=>{
            if(it.changesPercentage<0){
                loss.push(it);
            }
            if(it.changesPercentage>=0){
                gain.push(it);
            }
        })
        const sorted_gainers = gain.sort((a,b)=>b.changesPercentage-a.changesPercentage);
        const sorted_lossers = loss.sort((a,b)=>a.changesPercentage-b.changesPercentage);
        
        console.log(small);
        console.log(mid);
        console.log(lar);
        console.log(sorted_gainers);
        console.log(sorted_lossers);
        
        setSmaCapData(small);
        setMidCapData(mid);
        setLarCapData(lar);
        setGainer(sorted_gainers);
        setLooser(sorted_lossers);
        setLoading(false);

    }
    useEffect(()=>{
        getStockData();
    },[])
    return (
        <>{
            Loading?
            (<Loading_Spinner/>):
            <>
            <div className="section">
                <h1>LargeCap</h1>
                <div className="container">
             <div className="sect">
                {Lar_Cap.map((st,index)=>(
                   <h1 key={index}>{st.symbol}</h1>
                  
                ))}
             </div>
             </div>
             </div>
             
             <div className="section">
             <h1>SmallCap</h1>
             <div className="container">
             <div className="sect">
               
                {Sma_Cap.map((st,index)=>(
                   <h1 key={index}>{st.symbol}</h1>
                ))
                }
             </div>
             </div>
             </div>
             
             <div className="section">
                <h1>MidCap</h1>
                <div className="container">
                <div className="sect">
                {Mid_Cap.map((st,index)=>(
                   <h1 key={index}>{st.symbol}</h1>
                ))
                }
             </div>
             </div>
             </div>
             
             <div className="section">
             <h1>Top Gainers</h1>
             <div className="container">
             <div className="sect">
                {Gainer.map((st,index)=>(
                   <h1 key={index}>{st.symbol}</h1>
                ))
                }
             </div>
             </div>
             </div>

             <div className="section">
             <h1>Top Lossers</h1>
             <div className="container">
             <div className="sect">
                {Looser.map((st,index)=>(
                   <h1 key={index}>{st.symbol}</h1>
                ))
                }
             </div>
             </div>
             </div>
             
             
             
            </>

            
        }
        

        </>
    )
}
export default Dedicated_Stock;
