import { useQuery } from "@tanstack/react-query";
import { Crypto_QK, getCryptos } from "../api/crypto";
import Chart from "react-apexcharts";
import { useState } from "react";

const IndexPage = () => {
    const { data, isFetching, isError } = useQuery({
        queryKey: [Crypto_QK],
        queryFn: () => getCryptos(),
        // refetchOnWindowFocus: false
    })




    console.log("🚀 ~ file: Index.jsx:10 ~ IndexPage ~ data:", data)
    return <div>
        {
            data?.map(element => {
                console.log("🚀 ~ file: Index.jsx:18 ~ IndexPage ~ element:", JSON.parse(element.history))
                const chartopt = {
                    options: {
                        chart: {
                            type: 'candlestick',
                            height: 350
                        },
                        title: {
                            text: `${element.label} Chart`,
                            align: 'left'
                        },
                        xaxis: {
                            type: 'datetime'
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            }
                        }
                    }
                }

                const series = {
                    series:
                        [{
                            data: JSON.parse(element.history)
                        }]
                }
                return <>
                    <Chart
                        options={chartopt.options}
                        series={series.series }
                        type="candlestick"
                        width="500"
                    />
                    <img src={element.logo} />
                </>

            })
        }

    </div >;
}

export default IndexPage;