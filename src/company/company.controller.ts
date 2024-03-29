import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto';
import { User } from '../user/user.decorator';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, } from '@nestjs/swagger';
import { CompanyInterface } from './company.interface';
import { UserRO } from '../user/dto/user.ro';
import { CompanyEntity } from './company.entity';
import { HttpExceptionFilter } from '../shared/filters/http.exception.filter';

@ApiBearerAuth()
@ApiUseTags('/api/v1/companies')
@UseFilters(new HttpExceptionFilter())
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {
    }

    @ApiOperation({title: 'Get all companies'})
    @ApiResponse({status: 200, description: 'Return all companies.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Get()
    async findAll(@Query() query): Promise<any[]> {
        return await this.companyService.findAll();
    }

    @ApiOperation({title: 'Get company'})
    @ApiResponse({status: 200, description: 'Return one company.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @Get(':id')
    async findOne(@Param('id') id): Promise<CompanyEntity> {
        return await this.companyService.findOne(id);
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
