export const iconLayerCofig = {
    type: 'icon',
    config: {
      dataId: 'covid_19_data',
      color: [0,191,255],
      columns: {
        lat: 'source_lat',
        lng: 'source_lng',
        icon: 'icon'
      },
      visConfig:{
        radius: 100
      },
      isVisible: true
    }
  }