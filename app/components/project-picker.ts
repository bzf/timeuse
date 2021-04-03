import Component from '@glimmer/component';
import ProjectModel from 'timeuse/models/project';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

interface ProjectPickerArgs {
  projects: Array<ProjectModel>;
  selectedProject?: ProjectModel;
  onSelect?: (project: ProjectModel) => void;
}

export default class ProjectPicker extends Component<ProjectPickerArgs> {
  @tracked selectedIndex?: number;
  @tracked filter: string = '';

  get filteredProjects(): Array<ProjectModel> {
    if (isEmpty(this.filter)) {
      return this.args.projects;
    } else {
      return this.args.projects.filter((project) => {
        return project.name.indexOf(this.filter) != -1;
      });
    }
  }

  get selectedProject(): ProjectModel | undefined {
    if (this.selectedIndex !== undefined) {
      return this.filteredProjects[this.selectedIndex];
    } else {
      return undefined;
    }
  }

  @action
  focusInput(element: HTMLElement) {
    element.focus();
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
