import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days';
dayjs.extend(dayjsBusinessDays);

function useCalculateShipDay(tags) {
  const now = dayjs();

  if (_.includes(tags, 'EngagamentRings')) {
    now.businessDaysAdd(2);
  } else if (_.includes(tags, 'filter_classic_wedding_band')) {
    now.businessDaysAdd(1);
  } else if (_.includes(tags, 'bridalSets')) {
    now.businessDaysAdd(1);
  } else {
    now.businessDaysAdd(2);
  }

  let day, month, year;

  day =
    now.day() == 0
      ? 'Sunday'
      : now.day() == 0
      ? 'Monday'
      : now.day() == 1
      ? 'Tuesday'
      : now.day() == 2
      ? 'Wednesday'
      : now.day() == 3
      ? 'Thursday'
      : now.day() == 4
      ? 'Friday'
      : now.day() == 5
      ? 'Saturday'
      : null;
  month = now.month();
  year = now.year();

  return `${month} ${day}, ${year}`;
}

export default useCalculateShipDay;
