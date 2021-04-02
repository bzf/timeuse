import Component from '@glimmer/component';
import moment from 'moment';

export default class extends Component {
  get currentDate() {
    return moment().format('YYYY-MM-DD');
  }
}
