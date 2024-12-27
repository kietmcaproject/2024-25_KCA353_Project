import './explore_comp.css'
const Services=()=>{
  return (
    <>
            {/* service's section */}
            
            <div className="service"> 
            <h1>Services Provided</h1>
            <div className="card1">
               <div className="services" >
                {/*use a Investment logo or image */}
                <img src="logo\investment.png" alt=""/>
               <h3>Investment Trust</h3>
               </div>
               <div className="services">
               <img src="logo\etf.png" alt="" />
                {/*use a etf logo or image */}
                <h3>Etf</h3>
               </div>
               <div className="services">
               <img src="logo\stocks.png" alt="" />
                {/*use a stocks logo or image */}
                <h3>Stocks</h3>
               </div>
               </div>
            </div><br/>

    </>
  )
}
export default Services;
