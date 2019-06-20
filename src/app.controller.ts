const Handlebars = require("handlebars");
import { Get, Controller, Render, Res, Req } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller()
export class AppController {

    getSubdomain(req) {
        var domain = req.get('host').match(/\w+/); // e.g., host: "subdomain.website.com"
        console.log(domain);
        if (domain){
            const subdomain = domain[0]; // Use "subdomain"
            console.log(subdomain);
        }
    }

    @Get()
    @Render('index')
    root(@Res() res: Response, @Req() req: Request) {
        // console.log(res);
        // console.log(req);
        const subdomain = this.getSubdomain(req);
        console.log(subdomain);

        const indexPage = fs.readFileSync(join(__dirname, '..', 'views', 'index.hbs'));
        const template = Handlebars.compile(indexPage.toString());
        const context = {
            message: 'Hello world!',
            customers: [
                {
                    prospectPerson: {
                        fullName: '',
                        position: '',
                        description: '',
                    },
                    company: '',
                    city: '',
                    country: '',
                    caseStudy: [],
                    slug: '',
                    companyLogoUrl: '',
                    companyPortalUrl: '',
                }
            ],
            name: '',
            logoUrl: '',
            portalUrl: ''

        };
        const html = template(context);
        fs.writeFileSync(join(__dirname, '..', 'views', 'index.html'), html);

        return context;
    }
}
