import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked showProjectPicker: boolean = false;

  @action
  openProjectPicker() {
    this.showProjectPicker = true;
  }

  @action
  closeProjectPicker() {
    this.showProjectPicker = false;
  }
}
