import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto, TaskUpdateDto } from './dto';
import { TaskService } from './task.service';
import { GetCurrentUserId } from 'src/common/decorator';

@Controller('task')
export class TaskController {
  constructor(private TaskService: TaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('new')
  task(@Body() task: TaskDto, @GetCurrentUserId() userId: number) {
    return this.TaskService.createTask(task, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('all')
  getTask(@GetCurrentUserId() userId: number) {
    // Only return a associated task with a user
    return this.TaskService.getTask(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateTask(
    @GetCurrentUserId() userId: number,
    @Body() data: TaskUpdateDto,
  ){
    return this.TaskService.updateTask(userId, data)
  }

  @HttpCode(HttpStatus.OK)
  @Patch('remove')
  removeTask(@Body() taskId : number, @GetCurrentUserId() userId : number){
    return this.TaskService.removeTask(taskId, userId)
  }
}
