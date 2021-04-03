import Component from '@glimmer/component';
import ProjectModel from 'timeuse/models/project';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface ProjectPickerArgs {
  projects: Array<ProjectModel>;
  selectedProject?: ProjectModel;
  onSelect?: (project: ProjectModel) => void;
}

export default class ProjectPicker extends Component<ProjectPickerArgs> {
  @tracked selectedIndex?: number;

  get selectedProject(): ProjectModel | undefined {
    if (this.selectedIndex !== undefined) {
      return this.args.projects[this.selectedIndex];
    } else {
      return undefined;
    }
  }

  @action
  increaseIndex() {
    if (this.selectedIndex === undefined) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = (this.selectedIndex + 1) % this.args.projects.length;
    }
  }

  @action
  decreaseIndex() {
    if (this.selectedIndex === undefined || this.selectedIndex === 0) {
      this.selectedIndex = this.args.projects.length - 1;
    } else {
      this.selectedIndex = (this.selectedIndex - 1) % this.args.projects.length;
    }
  }

  @action
  resetIndex() {
    this.selectedIndex = undefined;
  }
}
