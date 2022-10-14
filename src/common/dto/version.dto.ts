import { ApiProperty } from '@nestjs/swagger';

export class VersionDto {
    @ApiProperty()
    version: string;
}
