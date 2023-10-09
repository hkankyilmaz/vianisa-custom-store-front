import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days';
dayjs.extend(dayjsBusinessDays);

function useCalculateShipDay(tags) {
  let now = dayjs().businessDaysAdd(2);

  if (_.includes(tags, 'EngagamentRings')) {
    now = now.businessDaysAdd(2);
  } else if (_.includes(tags, 'filter_classic_wedding_band')) {
    now = now.businessDaysAdd(1);
  } else if (_.includes(tags, 'bridalSets')) {
    now.businessDaysAdd(1);
  } else {
    now = now.businessDaysAdd(2);
  }

  let day, month, year;

  day = now.date();

  month =
    now.month() == 0
      ? 'January'
      : now.month() == 1
      ? 'February'
      : now.month() == 2
      ? 'March'
      : now.month() == 3
      ? 'April'
      : now.month() == 4
      ? 'May'
      : now.month() == 5
      ? 'June'
      : now.month() == 6
      ? 'July'
      : now.month() == 7
      ? 'Agust'
      : now.month() == 8
      ? 'September'
      : now.month() == 9
      ? 'October'
      : now.month() == 10
      ? 'November'
      : now.month() == 11
      ? 'December'
      : null;
  year = now.year();

  return `${month} ${day}, ${year}`;
}

export default useCalculateShipDay;
