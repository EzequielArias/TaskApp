import { ForbiddenException, Injectable } from '@nestjs/common';
import { TaskDto, TaskUpdateDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(task: TaskDto, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Not found');

    const newTask = await this.prisma.task.create({
      data: {
        title: task.title,
        difficulty: task.difficulty,
      },
    });
    const related = await this.prisma.task.update({
      where: {
        id: newTask.id,
      },
      data: {
        userId: user.id,
      },
    });
    return related;
  }

  async getTask(userId: number) {
    const result = await this.prisma.task.findMany({
      where: {
        userId: userId,
        isDeleted : false
      },
    });
    return result;
  }

  async updateTask(userId: number, dto: TaskUpdateDto): Promise<TaskUpdateDto> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });

      if (!user) throw new ForbiddenException('You should signup');

      const result = await this.prisma.task.update({
        where: {
          id: dto.id,
        },
        data: {
          title: dto.title,
          difficulty: dto.difficulty,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeTask(taskId : number, userId : number){
    console.log(taskId)
    const acess = await this.prisma.task.findUnique({
      where : {
        id : taskId['id']
      }
    })

    if(acess.userId !== userId) throw new ForbiddenException('Acess denied')

    const task = await this.prisma.task.update({
        where : {
            id : taskId['id']
        },
        data : {
            isDeleted : true
        }
    })
    return task
  }
  
}
