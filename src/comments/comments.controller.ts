import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
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
