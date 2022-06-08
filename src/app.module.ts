import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [AuthModule, AdminModule, MachinesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
