import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Post()
  async create(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(user, createCommentDto);
  }

  /*
   * Router Comments
   *
   * GET: /comments -> find (find all comments)
   * Post: /comments -> create
   * Get: /comments/:id -> findOne (find one by id)
   * Put: /comments/:id -> update by id
   *
   *
   *
   *
   * */
}
