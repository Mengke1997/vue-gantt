// 验证两个日期是否有重叠部分
function isOverlap(date1, date2) {
  const dateArr = [date1, date2];
  const newDateArr = dateArr.sort((val1, val2) => {
    return val1.start.substr(-2) - val2.start.substr(-2);
  });
  if (newDateArr[1].start.substr(-2) > newDateArr[0].end.substr(-2)) {
    return false;
  } else {
    return true;
  }
}

// 验证一个日期与数组里面某一项是否有冲突
function isAllOverlapFromArr(date, dateArr) {
  if (dateArr.length === 0) {
    return false;
  }
  let isAllOverlap = false;
  for (let i = 0; i < dateArr.length; i++) {
    if (isOverlap(date, dateArr[i])) {
      isAllOverlap = true;
    }
  }
  return isAllOverlap;
}

const GanttParse = {
  parse: function (userTasks) {
    const result = [[], [], []];
    for (let i = 0; i < userTasks.length; i++) {
      const taskItem = userTasks[i]; // 源每一项任务
      var flag = false;
      for (var j = 0; j < result.length; j++) {
        // 判断重叠
        if (isAllOverlapFromArr(taskItem, result[j])) {
          continue;
        } else {
          flag = true;
          result[j].push(taskItem);
          break;
        }
      }
      if (!flag) {
        result.push([taskItem]);
      }
    }
    return result;
  }
}

export default GanttParse;

