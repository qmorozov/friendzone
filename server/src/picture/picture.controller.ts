import {
    Body,
    Controller,
    HttpStatus,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PictureService} from "./picture.service";
import {multerOptions} from "./options/multer.options";
import {FileInterceptor} from "@nestjs/platform-express";
import {uploadsConstants} from "../constants/uploads.constants";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags("Pictures")
@Controller('picture')
export class PictureController {

    constructor(private pictureService: PictureService) {}

    @Post('/upload')
    @ApiOperation({summary: "Uploading Picture"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async upload(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: /(jpeg|png|jpg)$/,
            })
            .addMaxSizeValidator({
                maxSize: uploadsConstants.maxSize
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File
    ){
        return {
            success: true,
            fileName: file.filename
        };
    }
}
