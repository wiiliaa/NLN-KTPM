import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/auth/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) { }

  async findOne(id: number): Promise<Comment> {
    let found = await this.commentRepository.findOne({ where: { id } });

    if (!found) {
      throw new InternalServerErrorException(`Comments ${id} non-exist`);
    }
    return found;
  }

  async create(
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    // interface CreateCommentDto
    let { text, rate, product } = createCommentDto;

    let comment = new Comment();
    comment.text = text;
    comment.rate = rate;
    comment.user = user;
    comment.product = product;
    await comment.save();
    return comment;
  }

  async filter(filterCommentsDto: FilterCommentDto) {
    const { rate, isDESC } = filterCommentsDto;
    let query: any = {};
    let order: any = {};

    if (rate) {
      query.rate = rate;
    }

    if (isDESC == true) {
      order.rate = 'DESC';
    } else {
      order.rate = 'ASC';
    }

    const comments = await this.commentRepository.find({ where: query, order });
    return comments;
  }

  async findByUserId(userId: number): Promise<Comment[]> {
    let comments = await this.commentRepository.find({
      where: { user: { id: userId } },
    });
    return comments;
  }

  async findByProduct(productId: number) {
    return await this.commentRepository.find({
      where: { product: { id: productId } },
    });
  }
}
