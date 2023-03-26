import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/auth/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

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
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    // interface CreateCommentDto
    let { text, rate, productId } = createCommentDto;

    let comment = new Comment();
    comment.text = text;
    comment.rate = rate;
    comment.user_id = user.id;
    comment.product_id = productId;
    await comment.save();
    return comment;
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
