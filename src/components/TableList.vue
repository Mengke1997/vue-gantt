<template>
    <div class="tasks-wrap">    
      <div class="tasks-box">
        <!-- 表头 -->
        <div class="date-header">
          <span class="date-item user">用户</span>
          <span class="date-item" v-for="(date,index) in dates" :key="index">
            {{date.date}}
          </span>
        </div>
        <!-- 内容 -->
        <div 
          v-for="(task,idx) in taskList" 
          :class="['user-task-box',`total-height-${getMaxLevel(task.tasks)+1}`]"
          :key="idx">
          <div :class="['task-item','user']">
            <div class="user_pic">
                 <img :src="require('../assets/images/' + task.photo)" alt="">
            </div>
            <div class="name">
              {{task.name}}
            </div>
          </div>
          <div class="task-content">
            <div 
                v-for="(item,idx2) in task.tasks"
                :class="['task-item',`task-item-floor-${item.level}`,`task-item-len-${getIntervalOfDays(item.start,item.end)+1}`]"
                :style="{marginLeft:(item.start.substr(-2)-dayBegin)*162.5+162.5+'px'}"
                :key="idx2"
              >
                <p>{{item.text}}</p>
              </div>
          </div>
          
        </div>
      </div>
    </div>
</template>
<script>
    import taskList from '../../task.json'
    import moment from 'moment'
    export default {
      name:'Gantt',
      data(){
        return{
          dates:[],
          taskList:taskList,
          dayBegin:''
        }
      },
      mounted () {
        const weeks=[];
        for(var i=1;i<8;i++){
          var firstDay=moment().startOf('week');
          weeks.push({
            id:i,
            date:firstDay.add(i,'days').format('YYYY-MM-DD')
          });
        }
        this.dates=weeks;
        this.dayBegin=moment(weeks[0].date).date();
      },
      methods:{
        // 获取最大level
          getMaxLevel: function(tasks) {
          const res = tasks.map((val) => {
            return val.level;
          });
          return Math.max(...res);
        },
        // 获取年月日之间的日期差
        getIntervalOfDays:function (start, end) {
          // console.log('i am run ', end, start, moment(end).date() - moment(start).date());
          return moment(end).date() - moment(start).date();
        }
      }
    } 
</script>

<style lang="less" scoped>
@taskItemWidth: 162.5px; //一任务一天的长度
@userTaskHeight: 50px; //一层的高度

.tasks-wrap {
//   border: 1px solid red;
  .date-header {
    width: 100%;
    height: 45px;
    line-height:45px;
    display:flex;
    .date-item {
      display: inline-block;
      flex:1;
      text-align: center;
      background:hsla(0,0%,100%,.3);
      color:#fff;
    }
  }

  .tasks-box {
    border:2px solid hsla(0,0%,100%,.3);
    border-radius: 5px;
    overflow:hidden;
    width: 1300px;
    min-height: 600px;
    margin: 10px auto;
    position: relative;
    .user-task-box {
      position: relative;
      min-height: 160px;
      border-bottom:1px solid hsla(0,0%,100%,.3);
      display: flex;
    }
    .user-task-box:last-child{
      border:0px;
    }
    .user-task-box:hover {
      background-color: hsla(0,0%,100%,.3);
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
        background-color:#fff;
        border-radius:2px;
        margin: 0 6px;
      }
    }
    .task-item.user {
      justify-content: center;
      align-items: flex-start;
      border-right:1px solid hsla(0,0%,100%,.3);
      height:100%;
      .user_pic{
        width: 80px;
        height: 80px;
        padding: 10px 0;
        margin:0 auto;
        img{
          width:100%;
          border-radius: 50%;
        }
      }
      .name{
        color:#fff;
      }
    }
    .task-content{
      width:@taskItemWidth*7;
      height:100%;
      overflow: hidden;
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
  }
}
</style>

