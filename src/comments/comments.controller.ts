import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) { }

  @Get("/:id")
  async findOne(@Param("id") id: number) {
    return this.commentsService.findOne(id);
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
