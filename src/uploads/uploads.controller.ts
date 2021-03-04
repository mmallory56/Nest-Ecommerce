import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


//EndPoint for uploading files
@Controller('uploads')
export class UploadsController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        console.log(file)
    }
}