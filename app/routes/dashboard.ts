import Route from '@ember/routing/route';
import DailyTimers from 'timeuse/models/daily-timers';
import moment from 'moment';
import RSVP from 'rsvp';

export default class DashboardRoute extends Route {
  async model() {
    const { timers, projects } = await RSVP.hash({
      timers: this.store.findAll('timer'),
      projects: this.store.findAll('project'),
    });

    const filteredTimers = timers
      .rejectBy('isRunning')
      .rejectBy('isNew')
      .sortBy('endTimestamp')
      .reverse();

    const groupedTimers = filteredTimers.reduce((acc, t) => {
      const dateKey = moment(t.startTimestamp).format('YYYY-MM-DD');

      acc[dateKey] ||= [];
      acc[dateKey].push(t);

      return acc;
    }, {});

    return {
      projects,
      dailyTimers: Object.keys(groupedTimers).map(
        (key) => new DailyTimers(key, groupedTimers[key])
      ),
    };
  }
}
