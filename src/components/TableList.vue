<template>
    <div class="tasks-wrap">    
      <div class="tasks-box">
        <!-- 表头 -->
        <div class="date-header">
          <span class="date-item user" :data-test="taskList2">用户</span>
          <span class="date-item" v-for="(date,index) in dates" :key="index" >
            {{date.date}}
          </span>
        </div>
        <!-- 内容 -->
        <div 
          v-for="(usertask,idx) in taskList2" 
          :class="['user-task-box',`total-height-${usertask.tasks.length}`]"
          :key="idx">
          <div :class="['task-item','user']">
            <div class="user-content">
              <div class="user_pic">
                 <img :src="require('../assets/images/' + usertask.photo)" alt="">
              </div>
              <div class="name">
                {{usertask.name}}
              </div>
            </div>        
          </div>
          <div class="task-content">
              <!-- 每一层的任务 -->
              <div 
                v-for="(item,idx2) in usertask.tasks"
                :key="idx2"
              >
              <!-- 具体任务 -->
                <div 
                  v-for="(itemFloor,idx3) in item" :key="idx3"
                  :class="['task-item',`task-item-floor-${idx2}`,`task-item-len-${getIntervalOfDays(itemFloor.start,itemFloor.end)+1}`]"
                  :style="{marginLeft:((itemFloor.start.substr(-2)>beginDay?itemFloor.start.substr(-2):beginDay)-beginDay)*162.5+162.5+'px'}"
                  >
                    <p :title='itemFloor.text'  >{{itemFloor.text}}</p>
                </div>  
              </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
<script>
import taskList from "../../task.json";
import moment from "moment";
import GanttParse from "../utils/ganttPaser";

export default {
  name: "Gantt",
  data() {
    return {
      dates: [],
      taskList: taskList,
      beginDay: "",
      lastDay: ""
    };
  },
  mounted() {
    const weeks = [];
    for (var i = 1; i < 8; i++) {
      var firstDay = moment().startOf("week");
      weeks.push({
        id: i,
        date: firstDay.add(i, "days").format("YYYY-MM-DD")
      });
    }
    this.dates = weeks;
    this.beginDay = moment(weeks[0].date).date();
    this.lastDay = moment(weeks[6].date).date();
  },
  computed: {
    taskList2: function() {
      const newTaskList =  this.taskList.map(val => {
        return {
          ...val,
          tasks: GanttParse.parse(val.tasks)
        };
      });
      return newTaskList;
    }
  },
  methods: {
    // 获取年月日之间的日期差
    getIntervalOfDays: function(start, end) {
      var beginDay =
        moment(start).date() > this.beginDay
          ? moment(start).date()
          : this.beginDay;
      var lastDay =
        moment(end).date() > this.lastDay ? this.lastDay : moment(end).date();
      return lastDay - beginDay;
    }
  }
};
</script>

<style lang="less" scoped>
@taskItemWidth: 162.5px; //一任务一天的长度
@userTaskHeight: 50px; //一层的高度

.tasks-wrap {
  .date-header {
    width: 100%;
    height: 45px;
    line-height: 45px;
    display: flex;
    .date-item {
      display: inline-block;
      flex: 1;
      text-align: center;
      background: hsla(0, 0%, 100%, 0.3);
      color: #fff;
    }
  }

  .tasks-box {
    border: 2px solid hsla(0, 0%, 100%, 0.3);
    border-radius: 5px;
    overflow: hidden;
    width: 1300px;
    min-height: 600px;
    margin: 10px auto;
    position: relative;
    .user-task-box {
      position: relative;
      min-height: 160px;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.3);
      display: flex;
    }
    .user-task-box:last-child {
      border: 0px;
    }
    .user-task-box:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
    .user-task-box.total-height-1 {
      height: @userTaskHeight*1+10;
    }
    .user-task-box.total-height-2 {
      height: @userTaskHeight*2+10;
    }
    .user-task-box.total-height-3 {
      height: @userTaskHeight*3+10;
    }
    .user-task-box.total-height-4 {
      height: @userTaskHeight*4+10;
    }
    .task-item {
      width: @taskItemWidth;
      height: 40px;
      line-height: 40px;
      position: absolute;
      left: 0;
      > p {
        margin: 0;
        padding: 0;
        background-color: #fff;
        border-radius: 2px;
        margin: 0 6px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
      }
    }
    .task-item.user {
      justify-content: center;
      align-items: flex-start;
      border-right: 1px solid hsla(0, 0%, 100%, 0.3);
      height: 100%;
      .user-content {
        width: 100%;
        height: 110px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .user_pic {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .name {
          color: #fff;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .task-content {
      width: @taskItemWidth*7;
      height: 100%;
      align-items: flex-start;
    }
    .task-item.task-item-floor-0 {
      top: 10px;
    }
    .task-item.task-item-floor-1 {
      top: 60px;
    }
    .task-item.task-item-floor-2 {
      top: 110px;
    }
    .task-item.task-item-floor-3 {
      top: 160px;
    }
    .task-item.task-item-floor-4 {
      top: 210px;
    }
    .task-item.task-item-len-1 {
      width: @taskItemWidth*1;
    }
    .task-item.task-item-len-2 {
      width: @taskItemWidth*2;
    }
    .task-item.task-item-len-3 {
      width: @taskItemWidth*3;
    }
    .task-item.task-item-len-4 {
      width: @taskItemWidth*4;
    }
    .task-item.task-item-len-5 {
      width: @taskItemWidth*5;
    }
    .task-item.task-item-len-6 {
      width: @taskItemWidth*6;
    }
    .task-item.task-item-len-7 {
      width: @taskItemWidth*7;
    }
  }
}
</style>

