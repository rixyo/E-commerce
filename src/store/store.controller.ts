import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { Roles } from 'src/decoratores/role.decorator';
import { User, userType } from 'src/user/decorators/user.decrator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Roles('ADMIN')
  @Post()
  async createStore(@Body() body: CreateStoreDto, @User() user: userType) {
    return this.storeService.createStore(body, user.userId);
  }
  @Roles('ADMIN')
  @Get('all')
  async getAllStore(@User() user: userType) {
    return this.storeService.getAllStore(user.userId);
  }
  @Roles('ADMIN')
  @Get(':id')
  async getStoreById(@Param('id', ParseUUIDPipe) id: string) {
    return this.storeService.getStoreById(id);
  }
  @Roles('ADMIN')
  @Get()
  async getStoreByUserId(@User() user: userType) {
    return this.storeService.getStoreByUserId(user.userId);
  }
  @Roles('ADMIN')
  @Patch(':id')
  async updateStore(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateStoreDto,
  ) {
    return this.storeService.updateStore(id, body);
  }
  @Roles('ADMIN')
  @Delete(':id')
  async deleteStore(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: userType,
  ) {
    return this.storeService.deleteStore(id, user.userId);
  }
}