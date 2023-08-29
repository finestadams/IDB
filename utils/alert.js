import Notie from 'notie'
import 'notie/dist/notie.min.css'

export const NotieAlert = (props) => {
  const { position = 'top', stay = false, time = 3, type = 'success' } = props
  return Notie.alert({
    position,
    stay,
    time,
    type,
    ...props,
  })
}
