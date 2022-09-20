export const lineLayerConfig = {
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
            opacity: 0.5,
            outline: false,
            thickness: 10,
            "hi-precision": false
        }
    },
}