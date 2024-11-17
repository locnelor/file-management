import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';
import { VideoModule } from './video/video.module';
import { FolderModule } from './folder/folder.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [AuthModule, UploadModule, DownloadModule, VideoModule, FolderModule, SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
