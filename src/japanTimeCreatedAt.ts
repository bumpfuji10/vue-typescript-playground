import moment from 'moment'

export const japanTimeCreatedAt = (datetime: string) => {
  return moment(datetime).utcOffset('+09:00').format('YYYY/MM/DD HH:mm');
}
