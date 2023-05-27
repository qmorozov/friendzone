import {Controller, Get} from '@nestjs/common';
import {HobbyService} from "./hobby.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@Controller('/hobby')
export class HobbyController {

    constructor(private hobbyService: HobbyService) {}

    @Get("")
    @ApiOperation({summary: "Get List Hobbies"})
    @ApiOkResponse({description: "Array of hobby objects"})
    async getAll(){
        return await this.hobbyService.getAll();
    }
}
