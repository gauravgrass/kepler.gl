export const clusterLayerConfig = {
    // id: "hty62yd",
    type: "cluster",
    config: {
        dataId: "covid_19_data",
        label: "Covid 19",
        color: [
            21,
            23,
            23
        ],
        columns: {
            lat: "latitude",
            lng: "longitude",
            altitude: ""
        },
        isVisible: true,
        visConfig: {
            radius: 50,
            // radiusBasedOn: "confirmed",
            // radiusField: 'confirmed',
            fixedRadius: false,
            opacity: 0.3,
            outline: false,
            // thickness: 10,
            // colorRange: {
            //     name: "ColorBrewer PRGn-6",
            //     type: "diverging",
            //     category: "ColorBrewer",
            //     colors: [
            //         "#762a83",
            //         "#af8dc3",
            //         "#e7d4e8",
            //         "#d9f0d3",
            //         "#7fbf7b",
            //         "#1b7837"
            //     ],
            //     reversed: false
            // },
            radiusRange: [
                4.2,
                250.2
            ],
            "hi-precision": false
        }
    },

    // visualChannels: {
    //     colorField: {
    //         name: "confirmed",
    //         type: "integer"
    //     },
    //     colorScale: "quantize",
    //     sizeField: {
    //         name: "confirmed",
    //         type: "integer"
    //     },
    //     sizeScale: "sqrt"
    // }
}