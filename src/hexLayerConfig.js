export const hexLayerConfig = {
  type: 'hexagonId',
  config: {
      dataId: "covid_19_data",
      label: "Covid 19",
    color: [0,0,255],
    columns: {
      hex_id: 'hexagon_id'
    },
    isVisible: true,
    visConfig: {
      opacity: 0.05,
      worldUnitSize: 0.8,
      resolution: 8,
      colorRange: {
        name: 'ColorBrewer GnBu-6',
        type: 'sequential',
        category: 'ColorBrewer',
        colors: ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#43a2ca', '#0868ac'],
        reversed: false
      },
      coverage: 0.99,
      sizeRange: [0, 500],
      percentile: [0, 100],
      elevationPercentile: [0, 100],
      elevationScale: 5,
      'hi-precision': false,
      colorAggregation: 'average',
      sizeAggregation: 'average',
      enable3d: false
    }
  },
  visualChannels: {
    colorField: null,
    colorScale: 'quantile',
    sizeField: null,
    sizeScale: 'linear'
  }
}