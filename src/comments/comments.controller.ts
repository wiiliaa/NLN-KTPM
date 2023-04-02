import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get()
  async find() {
    return this.commentsService.find();
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get('/product/:productId')
  async findByProduct(@Param('productId') productId: number) {
    return this.commentsService.findByProduct(productId);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('access-token')
  async create(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    console.log(user);
    return this.commentsService.create(createCommentDto, user);
  }
  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
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
