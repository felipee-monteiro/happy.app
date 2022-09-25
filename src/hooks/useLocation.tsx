import * as React from 'react'
import api from '../services/api'

export const useLocation = () => {
  const [location, setLocation] = React.useState<any>({
    latitude: 0,
    longitude: 0
  })

  React.useEffect(() => {
    api('https://ipinfo.io')
      .get('?token=0c52537c77a301')
      .then(({ data }) => {
        data.loc
          .split(',')
          .forEach((item: any, index: number, array: any) => {
            if (index === 0) {
              setLocation({
                latitude: item,
                longitude: array[index + 1]
              })
            }
          })
      })
  }, [])

  return [location, setLocation]
}
