import {Controller, Get} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {LanguageService} from "./language.service";

@Controller('language')
export class LanguageController {

    constructor(private languageService: LanguageService) {}

    @Get("")
    @ApiOperation({summary: "Get List Languages"})
    @ApiOkResponse({description: "Array of language objects"})
    async getAll(){
        return await this.languageService.getAll();
    }

}
