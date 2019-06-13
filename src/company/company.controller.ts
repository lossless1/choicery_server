import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto';
import { User } from '../user/user.decorator';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, } from '@nestjs/swagger';
import { CompanyInterface } from './company.interface';
import { UserRO } from '../user/dto/user.ro';

@ApiBearerAuth()
@ApiUseTags('companies')
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {
    }

    @ApiOperation({title: 'Get all companies'})
    @ApiResponse({status: 200, description: 'Return all companies.'})
    @Get()
    async findAll(@User() user: UserRO, @Query() query): Promise<CompanyInterface[]> {
        return await this.companyService.findAll(user);
    }

    @ApiOperation({title: 'Get all companies'})
    @ApiResponse({status: 200, description: 'Return one company.'})
    @Get(':id')
    async findOne(@Param('id') id): Promise<CompanyInterface> {
        return await this.companyService.findOne({id});
    }

    @ApiOperation({title: 'Create company'})
    @ApiResponse({status: 201, description: 'The company has been successfully created.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Post()
    async create(@User('id') userId: number, @Body('company') companyDto: CreateCompanyDto) {
        return this.companyService.create(companyDto);
    }

    @ApiOperation({title: 'Update company'})
    @ApiResponse({status: 201, description: 'The company has been successfully updated.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Put(':id')
    async update(@Param() params, @Body('company') companyDto: CreateCompanyDto) {
        // Todo: update id also when title gets changed
        return this.companyService.update(params.id, companyDto);
    }

    @ApiOperation({title: 'Delete company'})
    @ApiResponse({status: 201, description: 'The company has been successfully deleted.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Delete(':id')
    async delete(@Param() params) {
        return this.companyService.delete(params.id);
    }
}
