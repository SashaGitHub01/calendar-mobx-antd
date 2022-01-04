import { Moment } from 'moment';

export const formatDate = (date: Moment) => {
   return date.format('D MMMM YYYY');
}