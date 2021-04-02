import Component from '@glimmer/component';
import moment from 'moment';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default class extends Component {
  get currentDate() {
    return moment().format('YYYY-MM-DD');
  }

  /* eslint-disable require-yield */
  *transition({ insertedSprites, removedSprites, keptSprites }) {
    for (let sprite of removedSprites) {
      fadeOut(sprite);
    }

    for (let sprite of insertedSprites) {
      fadeIn(sprite);
    }

    for (let sprite of keptSprites) {
      move(sprite);
    }
  }
  /* eslint-enable require-yield */
}
