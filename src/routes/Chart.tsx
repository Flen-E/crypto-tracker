import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexCharts from "react-apexcharts";

interface IHistoricalData{
    close : string;
    high : string;
    low : string;
    market_cap : string;
    open : string;
    time_close : number;
    time_open : number;
    volume : string;
}
interface CharProps {
    coinId : string;
}
function Chart({coinId} : CharProps){
    const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv",coinId], () => fetchCoinHistory(coinId))
    
    return (
        <div>
            {isLoading ? "Loading chart..." :
                <ApexCharts 
                type="line" 
                series = {[
                    {
                        name : "Price",
                        data : data?.map(price => parseFloat(price.close)) ?? [] ,
                    },
                ]}
                options={{
                    theme: {
                        mode : "dark"
                    },
                    
                    chart: {
                        height : 500,
                        width: 500,
                        toolbar : {
                            show : false,
                        },
                        background : "transparent", 
                    },
                    stroke: {
                        curve : "smooth",
                        width : 4,

                    },
                    yaxis : {
                        show: false,
                        
                    },
                    xaxis : {
                        labels : {
                            show: false,
                        },
                        axisTicks : {
                            show: false,
                        },
                        axisBorder : {
                            show: false,
                        },
                        categories: data?.map((price) =>
                            new Date(price.time_close * 1000).toUTCString()
                        ),
                        
                    },
                    fill : {
                        type : "gradient",
                        gradient : {
                            gradientToColors : ["#0be881"],
                            stops: [0, 100],

                        },
                    },
                    colors : ["#0fbcf9"],
                    tooltip : {
                        y : {
                            formatter : (value) => `$ ${value.toFixed(3)}`
                        }
                    }
                
                }}>

                </ApexCharts>
            }
        </div>
    )

}
export default Chart;