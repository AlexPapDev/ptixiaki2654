import React from 'react'
import { Marker } from 'react-map-gl'
import Pin from './Pin'
const MAX_CLUSTER_NUMBER = 20
const MapMarkers = ({clusters, points, setMarkerPopupInfo}) => {
  const getClusterNumber = num => num <= MAX_CLUSTER_NUMBER ? num : `${MAX_CLUSTER_NUMBER}+`
  return clusters.map((cluster, i) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;
    if (isCluster) {
      // Render cluster marker with point count
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          longitude={longitude}
          latitude={latitude}
        >
          <div
            style={{
              background: '#51D99B',
              borderRadius: '50%',
              color: '#fff',
              width: `${20 + (pointCount / points.length) * 20}px`,
              height: `${20 + (pointCount / points.length) * 20}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getClusterNumber(pointCount)}
          </div>
        </Marker>
      )
    }

    const markerKey = `marker-${cluster.properties.id}`
    // Render regular marker with SVG (customized appearance)
    return (
      <Marker
        key={markerKey}
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation()
          setMarkerPopupInfo(cluster.data)
        }}
      >
        <Pin number={cluster.pointIndexId} />
      </Marker>
    )
  })
}

export default MapMarkers