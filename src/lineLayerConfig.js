export const lineLayerConfig = {
    // id: "hty62yd",
    type: "line",
    config: {
        dataId: "covid_19_data",
        label: "Covid 19",
        color: [
            201,
            23,
            23
        ],
        columns: {
            lat0: 'source_lat',
            lng0: 'source_lng',
            lat1: 'target_lat',
            lng1: 'target_lng',
            altitude: ""
          },
        isVisible: true,
        visConfig: {
            // stroke:9,
            // radius: 250,
            // radiusBasedOn: "confirmed",
            // radiusField: 'confirmed',
            // fixedRadius: false,
            opacity: 0.5,
            outline: false,
            // resolution: 9,
            thickness: 10,
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
            // radiusRange: [
            //     4.2,
            //     250.2
            // ],
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