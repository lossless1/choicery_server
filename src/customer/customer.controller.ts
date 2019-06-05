import { Get, Post, Body, Put, Delete, Query, Param, Controller, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { User } from '../user/user.decorator';

import {
    ApiUseTags,
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { CustomerInterface } from './customer.interface';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@ApiBearerAuth()
@ApiUseTags('customers')
@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {
    }

    @ApiOperation({title: 'Get all companies'})
    @ApiResponse({status: 200, description: 'Return all companies.'})
    @Get()
    async findAll(@Query() query): Promise<CustomerInterface[]> {
        return await this.customerService.findAll();
    }

    @ApiOperation({title: 'Get all companies'})
    @ApiResponse({status: 200, description: 'Return one customer.'})
    @Get(':id')
    async findOne(@Param('id') id): Promise<any> {
        return await this.customerService.findOne({id});
    }

    @ApiOperation({title: 'Create customer'})
    @ApiResponse({status: 201, description: 'The customer has been successfully created.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Post()
    async create(@User('id') userId: number, @Body('customer') customerData: CreateCustomerDto) {
        return this.customerService.create(userId, customerData);
    }

    @ApiOperation({title: 'Update customer'})
    @ApiResponse({status: 201, description: 'The customer has been successfully updated.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Put(':id')
    async update(@Param() params, @Body('customer') customerData: CreateCustomerDto) {
        // Todo: update id also when title gets changed
        return this.customerService.update(params.id, customerData);
    }

    @ApiOperation({title: 'Delete customer'})
    @ApiResponse({status: 201, description: 'The customer has been successfully deleted.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Delete(':id')
    async delete(@Param() params) {
        return this.customerService.delete(params.id);
    }
}
