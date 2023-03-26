import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Get('/product/:productId')
  async findByProduct(@Param('productId') productId: number) {
    return this.commentsService.findByProduct(productId);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.create(createCommentDto, user);
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
