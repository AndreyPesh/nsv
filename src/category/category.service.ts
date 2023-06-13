import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './category.dto';
import { generatingSlug } from 'src/utils/generator-slug';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async getAll() {
    return await this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }

  async create() {
    return await this.prisma.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
  }

  async update(id: number, dto: CategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: generatingSlug(dto.name),
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
