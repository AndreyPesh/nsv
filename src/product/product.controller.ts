import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.productService.byId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Post()
  async create() {
    return this.productService.create();
  }

  // @UsePipes(new ValidationPipe())S
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
